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
import { EventNewInducementsTurn } from "@/types/Inducements/EventNewInducementsTurn";
import { Inducement } from "@/types/Inducements/Inducement";
import { Player } from "@/types/Teams/Player";
import { addBasePlayerData } from "./addBasePlayerData";
import { getStarPlayerName } from "../stringFromIdFunctions/getStarPlayerName";
// import { ResultTeamRerollUsage } from "@/types/messageData/ResultTeamRerollUsage";
// import { ResultRoll } from "@/types/messageData/ResultRoll";

export const processReplaySteps = (replaySteps: ReplayStep[]): MatchData => {
  // before anything else, we need to make sure all StepResult and StringMessage are arrays
  // this also needs to take into account that EventExecuteSequence can be an array of sequences
  replaySteps.forEach((step) => {
    if (step.EventExecuteSequence) {
      if (!Array.isArray(step.EventExecuteSequence)) {
        step.EventExecuteSequence = [step.EventExecuteSequence];
      }
    }
  });

  replaySteps.forEach((step) => {
    if (step.EventExecuteSequence) {
      step.EventExecuteSequence.forEach((sequence) => {
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
      });
    }
  });

  let matchData: MatchData = {
    matchLog: [] as Turn[],
    playerData: {},
    inducements: {
      homeTeam: {},
      awayTeam: {},
    },
    ballPossession: {
      homeTeam: 0,
      awayTeam: 0,
    },
  };

  // in the match data, generate each player and their actions
  replaySteps[0].BoardState.ListTeams.TeamState.forEach((team) => {
    team.ListPitchPlayers.PlayerState.forEach((player) => {
      matchData = addBasePlayerData(
        matchData,
        replaySteps[0].BoardState.ListTeams.TeamState.indexOf(team).toString(),
        player.Id as PlayerId
      );
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

  let nextTurnAction: TurnAction = {
    turnActionEvents: [],
    actionsTaken: {},
  };

  let inducementTurnData: EventNewInducementsTurn | undefined;
  let eventInducementsData: any | undefined;

  // Itterate over the replay steps and process them
  for (const step of replaySteps) {
    // // THIS MIGHT CAUSE AN ISSUE THAT IVE FORGOTTEN ABOUT! 
    // // Update the game phase
    // if (step.EventNewGamePhase) {
    //   gamePhase = step.EventNewGamePhase.Phase;
    // }

    // Process step by game phase

    // If the step has EventGamersAreReady, it's a information only step
    if (step.EventGamersAreReady) {
      // Dont do anything
      continue;
    }

    if (gamePhase === "0") {
      // // This is the pre-match Inducement phase

      // If the step has EventNewInducementsTurn, we need to set the current inducement turn data for the current team for use later
      if (step.EventNewInducementsTurn) {
        inducementTurnData = step.EventNewInducementsTurn;
      }

      const teamId = inducementTurnData?.GamerId || "0";
      const team = teamId === "1" ? "awayTeam" : "homeTeam";

      // If the step has EventInducementsData, we need to store the possible inducements for the two teams
      if (step.EventInducementsData) {
        eventInducementsData = step.EventInducementsData;
      }

      if (step.EventBuyMercenary) {
        // If the step has EventBuyMercenary, a team has bought a mercenary or star player
        if (!matchData.inducements[team].mercenaryPlayers) {
          matchData.inducements[team].mercenaryPlayers = [];
          matchData.inducements[team].starPlayers = [];
        }

        // We need to get the player data for the mercenary from the eventInducementsData
        const mercenaryPlayer =
          eventInducementsData?.TeamInducements?.TeamInducements?.[
            parseInt(teamId)
          ]?.InducementsCategories?.InducementsCategory?.find(
            (inducementCategory: Inducement) => {
              return (
                inducementCategory?.Players?.PlayerData?.IdPlayerTypes ===
                step?.EventBuyMercenary?.MercenaryType
              );
            }
          );
        if (!mercenaryPlayer) {
          console.warn(
            "No mercenary player found for the following step:",
            step
          );
          continue;
        }
        // Add Id, Number and TeamId to the player
        mercenaryPlayer.Players.PlayerData.Id =
          step.EventBuyMercenary.MercenaryId;
        mercenaryPlayer.Players.PlayerData.Number =
          step.EventBuyMercenary.MercenaryId;
        mercenaryPlayer.Players.PlayerData.TeamId = teamId;
        if (mercenaryPlayer.Type === "6") {
          // This is a Journeyman player
          mercenaryPlayer.Players.PlayerData.Journeyman = true;
          matchData.inducements[team].mercenaryPlayers?.push(
            mercenaryPlayer.Players.PlayerData as Player
          );
          matchData = addBasePlayerData(matchData, teamId, step.EventBuyMercenary.MercenaryId);
        }
        if (mercenaryPlayer.Type === "7") {
          // This is a Star player
          // Get the star player name
          mercenaryPlayer.Players.PlayerData.StarPlayer = true;
          const starPlayerName = getStarPlayerName(mercenaryPlayer.Players.PlayerData.IdPlayerTypes);
          if (starPlayerName) {
            mercenaryPlayer.Players.PlayerData.Name = starPlayerName;
          }
          matchData.inducements[team].starPlayers?.push(
            mercenaryPlayer.Players.PlayerData as Player
          );
          matchData = addBasePlayerData(matchData, teamId, step.EventBuyMercenary.MercenaryId);
        }
      }
    }

    if (gamePhase === "1") {
      // // Game phase 1 is match start

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

      // If the step has EventEndInducements, we can ignore it for now
      if (step.EventEndInducements) {
        // Dont log anything
      }
    }

    if (gamePhase === "2") {
      // Game phase 2 is pre-kick

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
          // const kickingTeam =
          //   step.EventActiveGamerChanged.NewActiveGamer || "0";
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
        step.EventExecuteSequence.forEach((sequence) => {
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
        });
      }

      // If the step has EventEndTurn, it's the end of a turn
      if (step.EventEndTurn) {
        // This is the end of the kickoff phase
      }
    }

    if (gamePhase === "5") {
      // Game phase 5 general match play, it is the most common and complex phase

      // Work out who, if anyone, has the ball
      let hasBall: PlayerId | undefined;
      if (step.BoardState.Ball.IsHeld === "1") {
        step.BoardState.ListTeams.TeamState.forEach((team) => {
          team.ListPitchPlayers.PlayerState.forEach((player) => {
            if (
              (player.Cell?.X || "0") ===
                (step.BoardState.Ball.Cell?.X || "0") &&
              (player.Cell?.Y || "0") === (step.BoardState.Ball.Cell?.Y || "0")
            ) {
              hasBall = player.Id as PlayerId;
            }
          });
        });
      }

      // If EventExecuteSequence then it's a player or board action
      if (step.EventExecuteSequence) {
        // We need to loop over the sequence and process each StepResult

        step.EventExecuteSequence.forEach((sequence) => {
          sequence.Sequence.StepResult.forEach((stepResult) => {
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
                  currentTurnAction = nextTurnAction;
                  currentTurnAction.playerId = stepMessageData.PlayerId;
                  nextTurnAction = {
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
                previousTurnAction: currentTurn.turnActions[currentTurn.turnActions.length - 1],
                currentTurnAction,
                nextTurnAction,
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
                nextTurnAction,
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
                nextTurnAction,
                hasBall,
              });
            }
          });
        });
      }

      
      if(step.EventTouchdown)  {
        // This is a touchdown event, we need to record the touchdown and the player that scored it
        currentTurnAction.actionsTaken.touchdownScored = true;
        currentTurn.touchdown = true;
        currentTurn.touchdownScorer = step.EventTouchdown.PlayerId;
      }

      if (step.EventEndTurn) {
        // there is a caveat here where the 'end turn' could be due to a pre-match setup event
        // we will know this if the EventNewGamePhase is 5. Hopefully this works...
        if(step.EventNewGamePhase?.Phase === "5") {
          continue;
        }


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

        // Check if the nextTurnAction is populated, if so add it to the currentTurn before we continue
        if (nextTurnAction?.playerId) {
          currentTurn.turnActions.push(nextTurnAction);
          nextTurnAction = {
            turnActionEvents: [],
            actionsTaken: {},
          };
        }

        // add the Turn to the list of match turns and start a new turn
        matchData.matchLog.push(currentTurn);

        // increment the turn number
        turnNumber += 1;

        // check if the half is over, if so swap the kickoff team
        if (turnNumber === 18) {
          // swap the kickoff team
          currentTurn.team = currentTurn.team === "0" ? "1" : "0";
        }

        // Check who (if anyone) has the ball and increment the possession counter
        if (hasBall) {
          // Find the player from the matchData
          const player = matchData.playerData[hasBall];
          if (player) {
            // Increment the players team possession counter
            const team = player.teamId === "1" ? "awayTeam" : "homeTeam";
            matchData.ballPossession[team] += 1;
          }
        }

        // Setup a new turn for the next team
        currentTurn = {
          team: currentTurn.team === "0" ? "1" : "0",
          turn: Math.ceil(turnNumber / 2),
          turnActions: [],
        };
      }
    }

    if (gamePhase === "6") {
      // This is the post-match phase

      if (step.EventMatchEnd) {
        // This is the end of the match event
        // If the MatchCompletionStatus is 1, the match was conceded
        if (step.EventMatchEnd.MatchCompletionStatus === "1") {
          // The match was conceded
          // The GamersEndMatchStatus will tell us who conceded
          step.EventMatchEnd.GamersEndMatchStatus.GamerEndMatchStatus.forEach((gamerEndMatchStatus, i) => {
            if (gamerEndMatchStatus.EndStatus) {
              matchData.conceded = i.toString() as "0" | "1";
            }
          });
        }

      }
    }

    // Update the game phase
    if (step.EventNewGamePhase) {
      gamePhase = step.EventNewGamePhase.Phase;
    }

  }
  
  return matchData;
};
