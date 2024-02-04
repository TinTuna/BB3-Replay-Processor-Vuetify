import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { xmlToJson } from "../helperFns/xmlToJson";

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
        result.Results.StringMessage.forEach((message) => {
          switch (message.Name) {
            case "ResultMoveOutcome": {
              // the player has moved
              // get the player id and the distance moved
              const messageData = xmlToJson(result.Step.MessageData);
              if (messageData.PlayerStep) {
                const playerData = Object.hasOwn(
                  matchData.playerData,
                  messageData.PlayerStep.PlayerId
                )
                  ? matchData.playerData[messageData.PlayerStep.PlayerId]
                  : (matchData.playerData[messageData.PlayerStep.PlayerId] =
                      {});

                playerData?.yardsMoved
                  ? (playerData.yardsMoved += 1)
                  : (playerData.yardsMoved = 1);
                // question whether the player has the ball
                step.BoardState.ListTeams.TeamState.forEach((team) => {
                  team.ListPitchPlayers.PlayerState.forEach((player) => {
                    if (player.Id === messageData.PlayerStep.PlayerId) {
                      if (
                        (player.Cell?.X || "0") ===
                          (step.BoardState.Ball.Cell?.X || "0") &&
                        (player.Cell?.Y || "0") ===
                          (step.BoardState.Ball.Cell?.Y || "0")
                      ) {
                        playerData.yardsMovedWithBall
                          ? (playerData.yardsMovedWithBall += 1)
                          : (playerData.yardsMovedWithBall = 1);
                      }
                    }
                  });
                });
              }
              break;
            }
            case "QuestionBlockDice": {
              // process the block dice
              break;
            }
            case "QuestionPushBack": {
              // process the pushback
              break;
            }
            case "QuestionFollowUp": {
              // process the follow up
              break;
            }
            case "ResultBlockRoll": {
              // process the block roll
              break;
            }
            case "ResultPushBack": {
              // process the pushback
              break;
            }
            case "ResultFollowUp": {
              // process the follow up
              break;
            }
            case "ResultBlockOutcome": {
              // process the block outcome
              break;
            }
            case "ResultRoll": {
              // process the roll
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
