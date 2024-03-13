import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { xmlToJson } from "../helperFns/xmlToJson";
import { PlayerStep } from "@/types/messageData/PlayerStep";
import { PlayerId } from "@/types/IdTypes/PlayerId";
import { Turn } from "@/types/Match/Turn";
import { TurnAction } from "@/types/Match/TurnAction";
import { GamePhase } from "@/types/Pitch/GamePhase";
import { Step } from "@/types/Match/Step";
import { processPlayerStep } from "./processPlayerStep";
import { processStep } from "./processStep";
import { processDamageStep } from "./processDamageStep";
// import { ResultTeamRerollUsage } from "@/types/messageData/ResultTeamRerollUsage";
// import { ResultRoll } from "@/types/messageData/ResultRoll";

export const processReplaySteps = (replaySteps: ReplayStep[]): MatchData => {
  // before anything else, we need to make sure all StepResult and StringMessage are arrays
  // this also needs to take into account that EventExecuteSequence can be an array of sequences
  replaySteps.forEach((step) => {
    if (step.EventExecuteSequence) {
      if (Array.isArray(step.EventExecuteSequence)) {
        step.EventExecuteSequence.forEach(
          (sequence: ReplayStep["EventExecuteSequence"]) => {
            if (sequence.Sequence.StepResult) {
              if (!Array.isArray(sequence.Sequence.StepResult)) {
                sequence.Sequence.StepResult = [sequence.Sequence.StepResult];
              }
              sequence.Sequence.StepResult.forEach((result) => {
                if (!Array.isArray(result.Results.StringMessage)) {
                  result.Results.StringMessage = [result.Results.StringMessage];
                }
              });
            }
          }
        );
      } else {
        replaySteps.forEach((step) => {
          if (step.EventExecuteSequence?.Sequence?.StepResult) {
            if (!Array.isArray(step.EventExecuteSequence.Sequence.StepResult)) {
              step.EventExecuteSequence.Sequence.StepResult = [
                step.EventExecuteSequence.Sequence.StepResult,
              ];
            }
            step.EventExecuteSequence.Sequence.StepResult.forEach((result) => {
              if (!Array.isArray(result.Results.StringMessage)) {
                result.Results.StringMessage = [result.Results.StringMessage];
              }
            });
          }
        });
      }
    }
  });

  const matchData: MatchData = {
    matchLog: [] as Turn[],
    playerData: {},
  };

  // in the match data, generate each player and their actions
  matchData.playerData = {};
  replaySteps[0].BoardState.ListTeams.TeamState.forEach((team) => {
    team.ListPitchPlayers.PlayerState.forEach((player) => {
      matchData.playerData[player.Id] = {
        playerId: player.Id as PlayerId,
        teamId:
          replaySteps[0].BoardState.ListTeams.TeamState.indexOf(
            team
          ).toString(),
        // movement stats
        yardsMoved: 0,
        yardsMovedWithBall: 0,
        // passing stats
        passesAttempted: {
          handoff: 0,
          short: 0,
          long: 0,
          longBomb: 0,
        },
        passesCompleted: {
          handoff: 0,
          short: 0,
          long: 0,
          longBomb: 0,
        },
        passesCaught: 0,
        passesDropped: 0,
        passesIntercepted: 0,
        // blocking stats
        blocksAttempted: 0,
        blockDiceRolled: {
          attackerDown: 0,
          bothDown: 0,
          push: 0,
          defenderStumbles: 0,
          defenderDown: 0,
        },
        blockDiceTaken: {
          attackerDown: 0,
          bothDown: 0,
          push: 0,
          defenderStumbles: 0,
          defenderDown: 0,
        },
        blockingRerollsUsed: {
          team: 0,
          pro: 0,
          brawler: 0,
        },
        assistsReceived: 0,
        pushFollowUps: 0,
        // receiving blocks
        timesPushed: 0,
        timesRemovedFromPlay: 0,
        // d6 rolls
        dSixRolls: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          six: 0,
        },
        // injuries
        armourRolls: {
          armourRolls: 0,
          armourRollsPassed: 0,
          armourRollsFailed: 0,
        },
        injuryRolls: {
          injuryRolls: 0,
          injuryStunned: 0,
          injuryKO: 0,
          injuryCasualty: 0,
        },
      };
    });
  });

  let gamePhase: GamePhase = "0";

  let turnNumber = 1;

  let currentTurn: Turn = {
    team: "0",
    turn: 1,
    turnActions: [],
  };
  let currentTurnAction: TurnAction = {
    turnActionEvents: [],
    actionsTaken: {},
  };
  // Itterate over the replay steps and process them
  for (const step of replaySteps) {
    // Process step by game phase

    // If the step has EventGamersAreReady, it's a information only step
    if (step.EventGamersAreReady) {
      // Dont do anything
      continue;
    }

    if (gamePhase === "1") {
      // // Game phase 1 is match start and inducements

      // If the setp has EventMatchStart, it's the start of the match
      // We can grab the EventFanFactor and the initial weather roll
      if (step.EventMatchStart) {
        // this is the first step of the match
        // get Fan Factor rolls
        matchData.fanFactor = {
          home: step.EventFanFactor.HomeRoll.Outcome,
          away: step.EventFanFactor.AwayRoll.Outcome,
        };
        // get initial weather roll
        matchData.weather = {
          fistHalf: step.EventWeatherRoll.Dice.Die.reduce((acc, die) => {
            return acc + parseInt(die.Value);
          }, 0),
          secondHalf: 0,
        };
      }

      // If the step has EventNewInducementsTurn, we can ignore it for now
      if (step.EventNewInducementsTurn) {
        // Dont do anything
      }
    }

    if (gamePhase === "2") {
      // Game phase 2 is pre-kick

      // If the step has EventEndInducements, we can ignore it for now
      if (step.EventEndInducements) {
        // Dont log anything
      }

      // If the step has EventQuestionKickingChoice, a player is choosing to kick or receive
      if (step.EventQuestionKickingChoice) {
        // TODO see what EventQuestionKickingChoice actually contains as this replay is empty, assuming that means the home team is selecting
      }

      // If the step has EventKickingChoice, a player has chosen to kick or receive
      if (step.EventKickingChoice) {
        // GamerId tells us who picks, Receive tells us if they're receiving
        const receive = step.EventKickingChoice.Receive === "1";
        // home or away choice: true = home, false = away
        const selection = step.EventKickingChoice.GamerId === "1";
        // if receive is true, the team that selected is the receiving team
        const firstHalfKick = receive ? (selection ? 1 : 0) : selection ? 0 : 1;

        matchData.kickoff = {
          firstHalfKick: firstHalfKick,
          secondHalfKick: firstHalfKick === 0 ? 1 : 0,
        };

        // Set the currentTurn to the team that will receive the ball
        currentTurn.team = firstHalfKick.toString() as "0" | "1";
      }
    }

    if (gamePhase === "3") {
      // Game phase 3 is pre-kick player setup

      // If the step has EventSetUpConfiguration, it's a setup phase
      if (step.EventSetUpConfiguration) {
        // Dont do anything
      }

      // If the step has EventSetUpMovePitchPlayer, it's a setup phase player move
      if (step.EventSetupMovePitchPlayer) {
        // Dont do anything
      }

      // If the step has EventEndTurn, it's the end of a turn
      if (step.EventEndTurn) {
        // This is the end of a setup phase turn
        // we need to check if the whole phase is over and both teams have setup
        if (step.EventNewGamePhase) {
          // the phase is over and setup is complete
          // EventActiveGamerChanged will tell us who will select the kicker
          const kickingTeam =
            step.EventActiveGamerChanged.NewActiveGamer || "0";
        }
      }
    }

    if (gamePhase === "4") {
      // Game phase 4 is picking kickoff player and direction, rolling the kickoff table, rolling the prayer table

      if (step.EventExecuteSequence) {
        //
      }

      if (step.EventKickOffTable) {
        // Process kickoff table

        // 4 - Cheering Fans
        if (step.EventCheeringFans) {
          // Process cheering fans
        }
      }

      if (step.EventPrayerTable) {
        // Process prayer table

        // 12 - Intensive Training
        if (step.EventQuestionIntensiveTraining) {
          // Process intensive training

          if (step.EventIntensiveTrainingSkill) {
            // Process intensive training
          }
          if (step.EventAddPlayerEffect) {
            // Process intensive training
          }
        }
      }

      if (step.EventExecuteSequence) {
        // its possible for EventExecuteSequence to be an array of sequences in phase 4 so we need to handle that
        if (Array.isArray(step.EventExecuteSequence)) {
          step.EventExecuteSequence.forEach(
            (sequence: ReplayStep["EventExecuteSequence"]) => {
              // TODO - Depending on the kickoff event, there could be PlayerSteps here
              // Need to abstract the PlayerStep logic to a function to be reused
              // Will ignore for now

              sequence.Sequence.StepResult.forEach((result) => {
                if (result.Step.Name === "Step") {
                  const stepMessageData = xmlToJson(result.Step.MessageData)
                    .Step as Step;

                  if (!stepMessageData) {
                    console.warn(
                      "No stepMessageData found in the following step:",
                      step
                    );
                    return;
                  }

                  // the stepMessageData tells us where the ball scattered from and to

                  result.Results.StringMessage.forEach((message) => {
                    if (message.Name === "ResultRoll") {
                      // the ResultRoll message.MessageData tells us the dice that were rolled to determine that outcome
                      // (it needes to be processed from XML to JSON first)
                    }
                  });
                }
              });
            }
          );
        } else {
          if (step.EventExecuteSequence.Sequence.StepResult) {
            step.EventExecuteSequence.Sequence.StepResult.forEach((result) => {
              if (result.Step.Name === "Step") {
                const stepMessageData = xmlToJson(result.Step.MessageData)
                  .Step as Step;

                if (!stepMessageData) {
                  console.warn(
                    "No stepMessageData found in the following step:",
                    step
                  );
                  return;
                }

                // the stepMessageData tells us where the ball scattered from and to

                result.Results.StringMessage.forEach((message) => {
                  if (message.Name === "ResultRoll") {
                    // the ResultRoll message.MessageData tells us the dice that were rolled to determine that outcome
                    // (it needes to be processed from XML to JSON first)
                  }
                });
              }
            });
          }
        }
        // If this is a Step, it's the ball scattering from the kickoff
      }

      // If the step has EventEndTurn, it's the end of a turn
      if (step.EventEndTurn) {
        // This is the end of the kickoff phase
      }
    }

    if (gamePhase === "5") {
      // Game phase 5 general match play, it is the most common and complex phase

      // Work out who, if anyone, has the ball
      let hasBall: string | undefined;
      if (step.BoardState.Ball.IsHeld === "1") {
        step.BoardState.ListTeams.TeamState.forEach((team) => {
          team.ListPitchPlayers.PlayerState.forEach((player) => {
            if (
              (player.Cell?.X || "0") ===
                (step.BoardState.Ball.Cell?.X || "0") &&
              (player.Cell?.Y || "0") === (step.BoardState.Ball.Cell?.Y || "0")
            ) {
              hasBall = player.Id;
            }
          });
        });
      }

      // If EventExecuteSequence then it's a player or board action
      if (step.EventExecuteSequence) {
        // We need to loop over the sequence and process each StepResult
        step.EventExecuteSequence.Sequence.StepResult.forEach((stepResult) => {
          // There are three options here, Step, DamageStep, and PlayerStep
          // Step is a board action
          // DamageStep is a player injury
          // PlayerStep is a player action

          // check if the step is a player step and the
          if (stepResult.Step.Name === "PlayerStep") {
            stepResult.Results.StringMessage.forEach((result) => {
              if (result.Name === "ResultUseAction") {
                // This is a new player action and we need to create a new turnAction
                const stepMessageData = xmlToJson(stepResult.Step.MessageData)
                  .PlayerStep as PlayerStep;

                if (currentTurnAction) {
                  // if one exists already, log it
                  currentTurn.turnActions.push(currentTurnAction);
                }
                currentTurnAction = {
                  playerId: stepMessageData.PlayerId,
                  turnActionEvents: [],
                  actionsTaken: {},
                };
              }
            });
          }

          // Check if we have a current turnAction and if so it is still for the same player

          if (stepResult.Step.Name === "PlayerStep") {
            processPlayerStep({
              stepResult,
              step,
              matchData,
              currentTurn,
              currentTurnAction,
              hasBall,
            });
          }

          if (stepResult.Step.Name === "Step") {
            processStep({
              stepResult,
              step,
              matchData,
              currentTurn,
              currentTurnAction,
              hasBall,
            });
          }

          if (stepResult.Step.Name === "DamageStep") {
            processDamageStep({
              stepResult,
              step,
              matchData,
              currentTurn,
              currentTurnAction,
              hasBall,
            });
          }
        });
      }

      if (step.EventEndTurn) {
        // If the step has EventEndTurn, it's the end of a turn
        // This is the end of a turn

        // add the current turn action to the current turn
        if (currentTurnAction?.playerId) {
          currentTurn.turnActions.push(currentTurnAction);
          currentTurnAction = {
            turnActionEvents: [],
            actionsTaken: {},
          };
        }

        // add the Turn to the list of match turns and start a new turn
        matchData.matchLog.push(currentTurn);

        turnNumber += 1;

        // check if the half is over, if so swap the kickoff team
        if (turnNumber === 18) {
          // swap the kickoff team
          currentTurn.team = currentTurn.team === "0" ? "1" : "0";
        }

        // Setup a new turn for the next team
        currentTurn = {
          team: currentTurn.team === "0" ? "1" : "0",
          turn: Math.ceil(turnNumber / 2),
          turnActions: [],
        };
      }
    }

    // Update the game phase
    if (step.EventNewGamePhase) {
      gamePhase = step.EventNewGamePhase.Phase;
    }
  }

  return matchData;
};
