import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { xmlToJson } from "../helperFns/xmlToJson";
import { PlayerStep } from "@/types/messageData/PlayerStep";
import { QuestionBlockDice } from "@/types/messageData/QuestionBlockDice";
// import { QuestionPushBack } from "@/types/messageData/QuestionPushBack";
import { ResultFollowUp } from "@/types/messageData/ResultFollowUp";
import { ResultBlockRoll } from "@/types/messageData/ResultBlockRoll";
import { ResultPushBack } from "@/types/messageData/ResultPushBack";
// import { ResultRoll } from "@/types/messageData/ResultRoll";

export const processReplaySteps = (replaySteps: ReplayStep[]): MatchData => {
  // before anything else, we need to make sure all StepResult and StringMessage are arrays
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

  const matchData: MatchData = {
    playerData: {},
  };

  // in the match data, generate each player and their actions
  matchData.playerData = {};
  replaySteps[0].BoardState.ListTeams.TeamState.forEach((team) => {
    team.ListPitchPlayers.PlayerState.forEach((player) => {
      matchData.playerData[player.Id] = {
        playerId: player.Id,
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
      };
    });
  });

  // Itterate over the replay steps and process them
  for (const step of replaySteps) {
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
    // TODO: do something with InducementsPhase
    if (step.EventKickingChoice) {
      // kick or receive: true = kick, false = receive
      const kick = step.EventKickingChoice.Kick === "1";
      // home or away choice: true = home, false = away
      const selection = step.EventRulesEngineStandBy?.ActiveGamer != "1";
      const firstHalfKick = kick ? (selection ? 0 : 1) : selection ? 1 : 0;
      matchData.kickoff = {
        firstHalfKick: firstHalfKick,
        secondHalfKick: firstHalfKick === 0 ? 1 : 0,
      };
    }
    // process the player steps
    if (step.EventExecuteSequence?.Sequence?.StepResult) {
      // the player has executed an action or sequence of actions (like moving or blitzing)
      // match on the type of action and process it
      step.EventExecuteSequence.Sequence.StepResult.forEach((result) => {
        // from the step messageData we can the player id, whom is taking the action
        // and the target of the action, amongst other things
        const stepMessageData = xmlToJson(result.Step.MessageData)
          .PlayerStep as PlayerStep;
        // TODO - there is a bug here as the setpMessageData could aditionally be Step or DamageStep

        if (!stepMessageData) {
          console.warn("No stepMessageData found in the following step:", step);
          return;
        }

        // check which team this player plays for
        let teamId = -1;
        const team = step.BoardState.ListTeams.TeamState.find((team) => {
          return team.ListPitchPlayers.PlayerState.some(
            (player) => player.Id === stepMessageData.PlayerId
          );
        });
        if (team) {
          teamId = step.BoardState.ListTeams.TeamState.indexOf(team);
        }

        const playerData = matchData.playerData[stepMessageData.PlayerId];

        let targetData: any = undefined;
        if (stepMessageData.TargetId) {
          targetData = matchData.playerData[stepMessageData.TargetId];
        }

        result.Results.StringMessage.forEach((message) => {
          switch (message.Name) {
            case "ResultMoveOutcome": {
              // the player has moved
              // get the player id and the distance moved

              //TODO process ResultMoveOutcome

              playerData.yardsMoved += 1;
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
                      playerData.yardsMovedWithBall += 1;
                    }
                  }
                });
              });

              break;
            }
            case "QuestionBlockDice": {
              // This is the roll of the block dice, this gives info on what dice were rolled and the outcome
              // it also lets us know what rerolls can be used (such as Pro) and whether the defender selects the outome

              const resultMessageData = xmlToJson(message.MessageData)
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
              const attackerChoice = resultMessageData.AttackerChoice === "1";
              const assists =
                resultMessageData.Assists?.AssistInfos?.length || 0;
              const canUseTeamReroll =
                resultMessageData.CanUseTeamReroll === "1";

              // add roll data to the matchData
              diceRolled.forEach((die) => {
                switch (die) {
                  case "1": {
                    playerData.blockDiceRolled.attackerDown += 1;
                    break;
                  }
                  case "2": {
                    playerData.blockDiceRolled.bothDown += 1;
                    break;
                  }
                  case "3": {
                    playerData.blockDiceRolled.push += 1;
                    break;
                  }
                  case "4": {
                    playerData.blockDiceRolled.push += 1;
                    break;
                  }
                  case "5": {
                    playerData.blockDiceRolled.defenderStumbles += 1;
                    break;
                  }
                  case "6": {
                    playerData.blockDiceRolled.defenderDown += 1;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              });
              playerData.assistsReceived += assists;
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

              const resultMessageData = xmlToJson(message.MessageData)
                .ResultFollowUp as ResultFollowUp;

              // add roll data to the matchData
              if (resultMessageData.Follow === "1") {
                playerData.pushFollowUps += 1;
              }
              break;
            }
            case "ResultBlockRoll": {
              // This tells us which block dice was selected in a block roll

              const resultMessageData = xmlToJson(message.MessageData)
                .ResultBlockRoll as ResultBlockRoll;

              const diceRolled = resultMessageData.Die.Value;

              // add roll data to the matchData
              switch (diceRolled) {
                case "1": {
                  playerData.blockDiceTaken.attackerDown += 1;
                  break;
                }
                case "2": {
                  playerData.blockDiceTaken.bothDown += 1;
                  break;
                }
                case "3": {
                  playerData.blockDiceTaken.push += 1;
                  break;
                }
                case "4": {
                  playerData.blockDiceTaken.push += 1;
                  break;
                }
                case "5": {
                  playerData.blockDiceTaken.defenderStumbles += 1;
                  break;
                }
                case "6": {
                  playerData.blockDiceTaken.defenderDown += 1;
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

              const resultMessageData = xmlToJson(message.MessageData)
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
              // process the skill usage
              break;
            }
            case "ResultInjuryRoll": {
              // process the injury roll
              break;
            }
            case "ResultCasualtyRoll": {
              // process the casualty roll
              break;
            }
            case "ResultPlayerRemoval": {
              // process the player removal
              break;
            }
            case "ResultTeamRerollUsage": {
              // process the team reroll usage
              break;
            }
            default: {
              break;
            }
          }
        });
      });
    }
  }

  console.log(matchData);

  return matchData;
};
