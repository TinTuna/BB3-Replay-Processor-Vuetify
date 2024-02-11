import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { xmlToJson } from "../helperFns/xmlToJson";
import { PlayerStep } from "@/types/messageData/PlayerStep";
import { QuestionBlockDice } from "@/types/messageData/QuestionBlockDice";
// import { QuestionPushBack } from "@/types/messageData/QuestionPushBack";
import { ResultFollowUp } from "@/types/messageData/ResultFollowUp";
import { ResultBlockRoll } from "@/types/messageData/ResultBlockRoll";
import { ResultPushBack } from "@/types/messageData/ResultPushBack";
import { PlayerId } from "@/types/IdTypes/PlayerId";
// import { ResultSkillUsage } from "@/types/messageData/ResultSkillUsage";
// import { ResultInjuryRoll } from "@/types/messageData/ResultInjuryRoll";
// import { ResultCasualtyRoll } from "@/types/messageData/ResultCasualtyRoll";
import { ResultPlayerRemoval } from "@/types/messageData/ResultPlayerRemoval";
import { ResultBlockOutcome } from "@/types/messageData/ResultBlockOutcome";
import { ref } from "vue";
import { Turn } from "@/types/Match/Turn";
import { TurnAction } from "@/types/Match/TurnAction";
import { GamePhase } from "@/types/Pitch/GamePhase";
import { Step } from "@/types/Match/Step";
import { StepResult } from "@/types/Match/StepResult";
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
      };
    });
  });

  let gamePhase: GamePhase = "0";

  let currentTurn: Turn = {
    team: "0",
    turn: 1,
    turnActions: [],
  };
  let currentTurnAction: TurnAction;
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
        // kick or receive: true = kick, false = receive
        const kick = step.EventKickingChoice.Kick === "1";
        // home or away choice: true = home, false = away
        const selection = step.EventActiveGamerChanged.NewActiveGamer != "1";
        const firstHalfKick = kick ? (selection ? 0 : 1) : selection ? 1 : 0;
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

      // If EventExecuteSequence then it's a player or board action
      if (step.EventExecuteSequence) {
        // We need to loop over the sequence and process each StepResult
        step.EventExecuteSequence.Sequence.StepResult.forEach((result) => {
          // There are three options here, Step, DamageStep, and PlayerStep
          // Step is a board action
          // DamageStep is a player injury
          // PlayerStep is a player action

          if (result.Step.Name === "PlayerStep") {
            const stepMessageData = xmlToJson(result.Step.MessageData)
              .PlayerStep as PlayerStep;

            if (!stepMessageData) {
              console.warn(
                "No stepMessageData found in the following step:",
                step
              );
              return;
            }

            // Check if the current turnAction is still for the same player
            if (!currentTurnAction) {
              // This is the first turnAction so create a new one
              currentTurnAction = {
                playerId: stepMessageData.PlayerId,
                turnActionEvents: [],
              };
            } else {
              // Check if the current turnAction is still for the same player
              if (currentTurnAction.playerId !== stepMessageData.PlayerId) {
                // This is a new player turnAction
                currentTurn.turnActions.push(currentTurnAction);
                currentTurnAction = {
                  playerId: stepMessageData.PlayerId,
                  turnActionEvents: [],
                };
              }
            }

            // Create a new turnActionEvent for this event
            const turnActionEvent = {
              eventType: result.Step.Name,
              eventResults: [] as StepResult[],
            };

            // Process the player step

            // Now we need to loop over the results of the action and process them
            result.Results.StringMessage.forEach((result) => {
              // Create a new StepResult for this result
              const stepResult = {
                actionName: result.Name,
                messageData: result.MessageData,
                actionString: result.Name,
              } as StepResult;

              switch (result.Name) {
                case "ResultMoveOutcome": {
                  // The player has moved from one cell to another

                  matchData.playerData[
                    stepMessageData.PlayerId
                  ].yardsMoved += 1;
                  // question whether the player has the ball
                  step.BoardState.ListTeams.TeamState.forEach((team) => {
                    team.ListPitchPlayers.PlayerState.forEach((player) => {
                      if (player.Id === stepMessageData.PlayerId) {
                        if (
                          (player.Cell?.X || "0") ===
                            (step.BoardState.Ball.Cell?.X || "0") &&
                          (player.Cell?.Y || "0") ===
                            (step.BoardState.Ball.Cell?.Y || "0")
                        ) {
                          matchData.playerData[
                            player.Id
                          ].yardsMovedWithBall += 1;
                        }
                      }
                    });
                  });
                  break;
                }
                case "QuestionBlockDice": {
                  // This is the roll of the block dice, this gives info on what dice were rolled and the outcome
                  // it also lets us know what rerolls can be used (such as Pro) and whether the defender selects the outome

                  const resultMessageData = xmlToJson(result.MessageData)
                    .QuestionBlockDice as QuestionBlockDice;

                  // resultMessageData.Dice.Die could be an array or an object, so we need to check for that
                  let diceRolled = [];
                  if (Array.isArray(resultMessageData.Dice.Die)) {
                    diceRolled = resultMessageData.Dice.Die.map(
                      (die: { DieType: string; Value: string }) => {
                        return die.Value;
                      }
                    );
                  } else {
                    diceRolled = [resultMessageData.Dice.Die.Value];
                  }
                  const attackerChoice =
                    resultMessageData.AttackerChoice === "1";
                  const assists =
                    resultMessageData.Assists?.AssistInfos?.length || 0;
                  const canUseTeamReroll =
                    resultMessageData.CanUseTeamReroll === "1";

                  // add roll data to the matchData
                  diceRolled.forEach((die) => {
                    switch (die) {
                      case "1": {
                        matchData.playerData[
                          stepMessageData.PlayerId
                        ].blockDiceRolled.attackerDown += 1;
                        break;
                      }
                      case "2": {
                        matchData.playerData[
                          stepMessageData.PlayerId
                        ].blockDiceRolled.bothDown += 1;
                        break;
                      }
                      case "3": {
                        matchData.playerData[
                          stepMessageData.PlayerId
                        ].blockDiceRolled.push += 1;
                        break;
                      }
                      case "4": {
                        matchData.playerData[
                          stepMessageData.PlayerId
                        ].blockDiceRolled.push += 1;
                        break;
                      }
                      case "5": {
                        matchData.playerData[
                          stepMessageData.PlayerId
                        ].blockDiceRolled.defenderStumbles += 1;
                        break;
                      }
                      case "6": {
                        matchData.playerData[
                          stepMessageData.PlayerId
                        ].blockDiceRolled.defenderDown += 1;
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  });
                  matchData.playerData[
                    stepMessageData.PlayerId
                  ].assistsReceived += assists;
                  break;
                }
                case "QuestionPushBack": {
                  // This is the outcome when a player selected a pushback outcome from a block roll
                  // it gives us the options of where the target can be pushed back to and where they currently are

                  // // Not used so commenting to save computation
                  // const resultMessageData = xmlToJson(message.MessageData)
                  //   .QuestionPushBack as QuestionPushBack;

                  // no need to add roll data to the matchData as this is handled by ResultBlockRoll
                  // playerData.blockDiceTaken.push += 1;
                  break;
                }
                case "QuestionFollowUp": {
                  // This is an intermediate step that relays the information on which cell the target was pushed from and to
                  break;
                }
                case "ResultFollowUp": {
                  // This tells us the choice of whether the attacker followed up or not

                  const resultMessageData = xmlToJson(result.MessageData)
                    .ResultFollowUp as ResultFollowUp;

                  // add roll data to the matchData
                  if (resultMessageData.Follow === "1") {
                    matchData.playerData[
                      stepMessageData.PlayerId
                    ].pushFollowUps += 1;
                  }
                  break;
                }
                case "ResultBlockRoll": {
                  // This tells us which block dice was selected in a block roll

                  const resultMessageData = xmlToJson(result.MessageData)
                    .ResultBlockRoll as ResultBlockRoll;

                  const diceRolled = resultMessageData.Die.Value;

                  // add roll data to the matchData
                  switch (diceRolled) {
                    case "1": {
                      matchData.playerData[
                        stepMessageData.PlayerId
                      ].blockDiceTaken.attackerDown += 1;
                      break;
                    }
                    case "2": {
                      matchData.playerData[
                        stepMessageData.PlayerId
                      ].blockDiceTaken.bothDown += 1;
                      break;
                    }
                    case "3": {
                      matchData.playerData[
                        stepMessageData.PlayerId
                      ].blockDiceTaken.push += 1;
                      break;
                    }
                    case "4": {
                      matchData.playerData[
                        stepMessageData.PlayerId
                      ].blockDiceTaken.push += 1;
                      break;
                    }
                    case "5": {
                      matchData.playerData[
                        stepMessageData.PlayerId
                      ].blockDiceTaken.defenderStumbles += 1;
                      break;
                    }
                    case "6": {
                      matchData.playerData[
                        stepMessageData.PlayerId
                      ].blockDiceTaken.defenderDown += 1;
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                  break;
                }
                case "ResultPushBack": {
                  // This tells us which player was pushed, and to which cell

                  const resultMessageData = xmlToJson(result.MessageData)
                    .ResultPushBack as ResultPushBack;

                  // add roll data to the matchData
                  // we could use the targetData BUT I'm not certain how the output handles cascading pushes
                  // so lets grab the player data from the Id instead
                  const pushedPlayerData =
                    matchData.playerData[resultMessageData.PushedPlayerId];
                  pushedPlayerData.timesPushed += 1;
                  break;
                }
                case "ResultBlockOutcome": {
                  // ResultBlockOutcome is an overview of the block action. We could grab some of the data from here but it's not
                  // necessary as we have the same data from other messages

                  // const resultMessageData = xmlToJson(message.MessageData)
                  //   .ResultBlockOutcome as ResultBlockOutcome;

                  break;
                }
                case "ResultRoll": {
                  // This tells us the result of a roll
                  // it has data such as the type of roll, the value rolled and the target value
                  // it also tells us if the roll was a success or a failure

                  // // Not yet used so commenting to save computation
                  // const resultMessageData = xmlToJson(message.MessageData)
                  //   .ResultRoll as ResultRoll;

                  // add roll data to the matchData
                  // TODO: process the roll data
                  break;
                }
                case "ResultSkillUsage": {
                  // This tells us the skill used, and by which player

                  // // Not yet used so commenting to save computation
                  // const resultMessageData = xmlToJson(message.MessageData)
                  //   .ResultSkillUsage as ResultSkillUsage;

                  break;
                }
                case "ResultInjuryRoll": {
                  // This tells the roll and result of an injury roll (Armour Break), and which player was potentially injured
                  // if successful, a ResultCasualtyRoll will follow

                  // // Not yet used so commenting to save computation
                  // const resultMessageData = xmlToJson(message.MessageData)
                  //   .ResultInjuryRoll as ResultInjuryRoll;

                  break;
                }
                case "ResultCasualtyRoll": {
                  // This is called when an armour break is successful and the injury roll is made
                  // on a roll of 8-12, a ResultPlayerRemoval will follow

                  // // Not yet used so commenting to save computation
                  // const resultMessageData = xmlToJson(message.MessageData)
                  //   .ResultCasualtyRoll as ResultCasualtyRoll;

                  break;
                }
                case "ResultPlayerRemoval": {
                  // This tells us who was removed from the pitch and why

                  // // Not yet used so commenting to save computation
                  const resultMessageData = xmlToJson(result.MessageData)
                    .ResultPlayerRemoval as ResultPlayerRemoval;

                  // add roll data to the matchData
                  matchData.playerData[
                    resultMessageData.PlayerId
                  ].timesRemovedFromPlay += 1;

                  break;
                }
                case "ResultTeamRerollUsage": {
                  // This tells us a reroll was used and by which _player_ (not by which team)

                  // // Not yet used so commenting to save computation
                  // const resultMessageData = xmlToJson(message.MessageData)
                  //   .ResultTeamRerollUsage as ResultTeamRerollUsage;

                  break;
                }
                default: {
                  break;
                }
              }

              // Add the result to the turnActionEvent
              turnActionEvent.eventResults.push(stepResult);
            });

            // Add the turnActionEvent to the currentTurnAction
            currentTurnAction.turnActionEvents.push(turnActionEvent);
          }

          if (result.Step.Name === "Step") {
            // We'll ignore this for now
          }

          if (result.Step.Name === "DamageStep") {
            // We'll ignore this for now
          }
        });
      }

      // If the step has EventEndTurn, it's the end of a turn
      if (step.EventEndTurn) {
        // This is the end of a turn
        // add the Turn to the list of match turns and start a new turn
        matchData.matchLog.push(currentTurn);

        // Setup a new turn for the next team
        currentTurn = {
          team: step.EventEndTurn.NextPlayingGamer,
          turn: currentTurn.turn + 1,
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
