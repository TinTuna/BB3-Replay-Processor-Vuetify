import { Step } from "@/types/Match/Step";
import { xmlToJson } from "../helperFns/xmlToJson";
import { PlayerStep } from "@/types/messageData/PlayerStep";
import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { PlayerId } from "@/types/IdTypes/PlayerId";
import { Turn } from "@/types/Match/Turn";
import { StepResult } from "@/types/Match/StepResult";
import { TurnAction } from "@/types/Match/TurnAction";
import { ResultBlockOutcome } from "@/types/messageData/ResultBlockOutcome";
import { ResultPlayerRemoval } from "@/types/messageData/ResultPlayerRemoval";

export const processPlayerStep = (opts: {
  stepResult: Step;
  step: ReplayStep;
  matchData: MatchData;
  currentTurn: Turn;
  currentTurnAction: TurnAction;
  hasBall: string | undefined;
}) => {
  const {
    stepResult,
    step,
    matchData,
    currentTurn,
    currentTurnAction,
    hasBall,
  } = opts;
  const stepMessageData = xmlToJson(stepResult.Step.MessageData)
    .PlayerStep as PlayerStep;

  if (!stepMessageData) {
    console.warn("No stepMessageData found in the following step:", step);
    return opts;
  }

  if (!matchData.playerData[stepMessageData.PlayerId]) {
    // A star player?

    matchData.playerData[stepMessageData.PlayerId] = {
      playerId: stepMessageData.PlayerId as PlayerId,
      teamId: currentTurn.team,
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
  }

  // Create a new turnActionEvent for this event
  const turnActionEvent = {
    eventType: stepResult.Step.Name,
    eventResults: [] as StepResult[],
  };

  // Process the player step

  // Now we need to loop over the results of the action and process them
  stepResult.Results.StringMessage.forEach((result) => {
    // Create a new StepResult for this result
    const stepResult = {
      actionName: result.Name,
      messageData: result.MessageData,
      actionString: result.Name,
    } as StepResult;

    switch (result.Name) {
      case "ResultMoveOutcome": {
        // The player has moved from one cell to another

        // add move data to the matchData
        matchData.playerData[stepMessageData.PlayerId].yardsMoved += 1;

        // Add move data to the currentTurnAction
        currentTurnAction.actionsTaken.yardsMoved
          ? (currentTurnAction.actionsTaken.yardsMoved += 1)
          : (currentTurnAction.actionsTaken.yardsMoved = 1);

        // If the player has the ball, we need to track the yards moved with the ball
        if (stepMessageData.PlayerId === hasBall) {
          matchData.playerData[
            stepMessageData.PlayerId
          ].yardsMovedWithBall += 1;
        }

        // We can work out from the StepMessageData where the player moved from and to, and if it was into an endzone
        // the tochdown endzones are X: 0 and X: 25, we can work out which end they need to be in from the currentTurn.team
        const touchdownEnd = currentTurn.team === "0" ? "25" : "0";
        currentTurn.touchdown = stepMessageData.CellTo.X === touchdownEnd;

        // Add touchdown data to the currentTurnAction
        if (currentTurn.touchdown) {
          currentTurn.touchdownScorer = stepMessageData.PlayerId;
          currentTurnAction.actionsTaken.touchdownScored = true;
        }
        break;
      }
      case "QuestionBlockDice": {
        // This is the roll of the block dice, this gives info on what dice were rolled and the outcome
        // it also lets us know what rerolls can be used (such as Pro) and whether the defender selects the outome

        // const resultMessageData = xmlToJson(result.MessageData)
        //   .QuestionBlockDice as QuestionBlockDice;

        // // resultMessageData.Dice.Die could be an array or an object, so we need to check for that
        // let diceRolled = [];
        // if (Array.isArray(resultMessageData.Dice.Die)) {
        //   diceRolled = resultMessageData.Dice.Die.map(
        //     (die: { DieType: string; Value: string }) => {
        //       return die.Value;
        //     }
        //   );
        // } else {
        //   diceRolled = [resultMessageData.Dice.Die.Value];
        // }
        // const attackerChoice =
        //   resultMessageData.AttackerChoice === "1";
        // const assists =
        //   resultMessageData.Assists?.AssistInfos?.length || 0;
        // const canUseTeamReroll =
        //   resultMessageData.CanUseTeamReroll === "1";

        // // add roll data to the matchData
        // diceRolled.forEach((die) => {
        //   switch (die) {
        //     case "1": {
        //       matchData.playerData[
        //         stepMessageData.PlayerId
        //       ].blockDiceRolled.attackerDown += 1;
        //       break;
        //     }
        //     case "2": {
        //       matchData.playerData[
        //         stepMessageData.PlayerId
        //       ].blockDiceRolled.bothDown += 1;
        //       break;
        //     }
        //     case "3": {
        //       matchData.playerData[
        //         stepMessageData.PlayerId
        //       ].blockDiceRolled.push += 1;
        //       break;
        //     }
        //     case "4": {
        //       matchData.playerData[
        //         stepMessageData.PlayerId
        //       ].blockDiceRolled.push += 1;
        //       break;
        //     }
        //     case "5": {
        //       matchData.playerData[
        //         stepMessageData.PlayerId
        //       ].blockDiceRolled.defenderStumbles += 1;
        //       break;
        //     }
        //     case "6": {
        //       matchData.playerData[
        //         stepMessageData.PlayerId
        //       ].blockDiceRolled.defenderDown += 1;
        //       break;
        //     }
        //     default: {
        //       break;
        //     }
        //   }
        // });
        // matchData.playerData[
        //   stepMessageData.PlayerId
        // ].assistsReceived += assists;

        // // Add block data to the currentTurnAction
        // currentTurnAction.actionsTaken.blockAttempted
        //   ? (currentTurnAction.actionsTaken.blockAttempted += 1)
        //   : (currentTurnAction.actionsTaken.blockAttempted = 1);
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

        // const resultMessageData = xmlToJson(result.MessageData)
        //   .ResultFollowUp as ResultFollowUp;

        // // add roll data to the matchData
        // if (resultMessageData.Follow === "1") {
        //   matchData.playerData[
        //     stepMessageData.PlayerId
        //   ].pushFollowUps += 1;
        // }
        break;
      }
      case "ResultBlockRoll": {
        // This tells us which block dice was selected in a block roll

        // const resultMessageData = xmlToJson(result.MessageData)
        //   .ResultBlockRoll as ResultBlockRoll;

        // const diceRolled = resultMessageData.Die.Value;

        // // add roll data to the matchData
        // switch (diceRolled) {
        //   case "1": {
        //     matchData.playerData[
        //       stepMessageData.PlayerId
        //     ].blockDiceTaken.attackerDown += 1;
        //     break;
        //   }
        //   case "2": {
        //     matchData.playerData[
        //       stepMessageData.PlayerId
        //     ].blockDiceTaken.bothDown += 1;
        //     break;
        //   }
        //   case "3": {
        //     matchData.playerData[
        //       stepMessageData.PlayerId
        //     ].blockDiceTaken.push += 1;
        //     break;
        //   }
        //   case "4": {
        //     matchData.playerData[
        //       stepMessageData.PlayerId
        //     ].blockDiceTaken.push += 1;
        //     break;
        //   }
        //   case "5": {
        //     matchData.playerData[
        //       stepMessageData.PlayerId
        //     ].blockDiceTaken.defenderStumbles += 1;
        //     break;
        //   }
        //   case "6": {
        //     matchData.playerData[
        //       stepMessageData.PlayerId
        //     ].blockDiceTaken.defenderDown += 1;
        //     break;
        //   }
        //   default: {
        //     break;
        //   }
        // }

        break;
      }
      case "ResultPushBack": {
        // This tells us which player was pushed, and to which cell

        // const resultMessageData = xmlToJson(result.MessageData)
        //   .ResultPushBack as ResultPushBack;

        // // add roll data to the matchData
        // // we could use the targetData BUT I'm not certain how the output handles cascading pushes
        // // so lets grab the player data from the Id instead
        // const pushedPlayerData =
        //   matchData.playerData[resultMessageData.PushedPlayerId];
        // if (!pushedPlayerData) {
        //   console.log(
        //     "Player not found in matchData",
        //     resultMessageData.PushedPlayerId
        //   );
        // } else {
        //   pushedPlayerData.timesPushed += 1;
        // }
        break;
      }
      case "ResultBlockOutcome": {
        // ResultBlockOutcome is an overview of the block action.
        // For the moment we will use this section to count blocks and block outcomes

        const resultMessageData = xmlToJson(result.MessageData)
          .ResultBlockOutcome as ResultBlockOutcome;

        // Add the output type to the players data
        switch (resultMessageData.Outcome) {
          case "1":
            // Attacker Down
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.attackerDown += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "attackerDown";
            break;
          case "2":
            // Both Down
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.bothDown += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "bothDown";
            break;
          case "3":
            // Push
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.push += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "push";
            break;
          case "4":
            // Push
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.push += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "push";
            break;
          case "5":
            // Defender Stumbles
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.defenderStumbles += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "defenderStumbles";
            break;
          case "6":
            // Defender Down
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.defenderDown += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "defenderDown";
            break;
          default:
            // No result
            break;
        }

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

        // Add ResultCasualtyRoll data to the currentTurnAction
        currentTurnAction.actionsTaken.injuryInflicted = "injuryInflicted";

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
  
  return opts;
};
