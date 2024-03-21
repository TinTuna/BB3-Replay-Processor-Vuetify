import { Step } from "@/types/Match/Step";
import { xmlToJson } from "../helperFns/xmlToJson";
import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { Turn } from "@/types/Match/Turn";
import { StepResult } from "@/types/Match/StepResult";
import { TurnAction } from "@/types/Match/TurnAction";
import { ResultPlayerRemoval } from "@/types/messageData/ResultPlayerRemoval";
import { DamageStep } from "@/types/messageData/DamageStep";
import { ResultCasualtyRoll } from "@/types/messageData/ResultCasualtyRoll";
import { ResultInjuryRoll } from "@/types/messageData/ResultInjuryRoll";
import { ResultRoll } from "@/types/messageData/ResultRoll";
import { processDieRoll } from "../helperFns/processDieRoll";

export const processDamageStep = (opts: {
  stepResult: Step;
  step: ReplayStep;
  matchData: MatchData;
  currentTurn: Turn;
  currentTurnAction: TurnAction;
  hasBall: string | undefined;
}) => {
  const { stepResult, step, matchData, currentTurn, currentTurnAction } = opts;
  const stepMessageData = xmlToJson(stepResult.Step.MessageData)
    .DamageStep as DamageStep;

  if (!stepMessageData) {
    console.warn("No stepMessageData found in the following step:", step);
    return opts;
  }

  // Create a new turnActionEvent for this event
  const turnActionEvent = {
    eventType: stepResult.Step.Name,
    eventResults: [] as StepResult[],
  };

  // Process the damage step

  // Now we need to loop over the results of the action and process them
  stepResult.Results.StringMessage.forEach((result) => {
    // Create a new StepResult for this result
    const stepResult = {
      actionName: result.Name,
      messageData: result.MessageData,
      actionString: result.Name,
    } as StepResult;

    switch (result.Name) {
      case "ResultRoll": {
        // This tells us the result of a roll
        // it has data such as the type of roll, the value rolled and the target value
        // it also tells us if the roll was a success or a failure

        const resultMessageData = xmlToJson(result.MessageData)
          .ResultRoll as ResultRoll;

        // resultMessageData.Difficulty is the modified target number
        // resultMessageData.Dice[] are the dice rolled
        // resultMessageData.Outcome is the result of the roll

        // add d6 roll data to the playerData
        // check if Dice.Die is an array or a single object
        if (Array.isArray(resultMessageData.Dice.Die)) {
          resultMessageData.Dice.Die.forEach((die) => {
            processDieRoll({
              dieRoll: die,
              playerId: stepMessageData.PlayerId,
              matchData,
            });
          });
        } else {
          processDieRoll({
            dieRoll: resultMessageData.Dice.Die,
            playerId: stepMessageData.PlayerId,
            matchData,
          });
        }

        // add injury roll data to the playerData
        matchData.playerData[
          stepMessageData.PlayerId
        ].armourRolls.armourRolls += 1;
        if (resultMessageData.Outcome === "1") {
          matchData.playerData[
            stepMessageData.PlayerId
          ].armourRolls.armourRollsFailed += 1;
        } else {
          matchData.playerData[
            stepMessageData.PlayerId
          ].armourRolls.armourRollsPassed += 1;
        }

        break;
      }
      case "ResultInjuryRoll": {
        // This tells the roll and result of an injury roll (Armour Break), and which player was potentially injured
        // if successful, a ResultCasualtyRoll will follow

        const resultMessageData = xmlToJson(result.MessageData)
          .ResultInjuryRoll as ResultInjuryRoll;

        if (Array.isArray(resultMessageData.Dice.Die)) {
          resultMessageData.Dice.Die.forEach((die) => {
            processDieRoll({
              dieRoll: die,
              playerId: stepMessageData.PlayerId,
              matchData,
            });
          });
        } else {
          processDieRoll({
            dieRoll: resultMessageData.Dice.Die,
            playerId: stepMessageData.PlayerId,
            matchData,
          });
        }

        // add injury roll data to the playerData
        matchData.playerData[
          stepMessageData.PlayerId
        ].injuryRolls.injuryRolls += 1;
        switch (resultMessageData.Outcome) {
          case "0": {
            matchData.playerData[
              stepMessageData.PlayerId
            ].injuryRolls.injuryStunned += 1;
            currentTurn.knockdown ? currentTurn.knockdown += 1 : currentTurn.knockdown = 1;
            currentTurnAction.actionsTaken.knockdownInflicted ? currentTurnAction.actionsTaken.knockdownInflicted : 'Stunned';
            break;
          }
          case "2": {
            matchData.playerData[
              stepMessageData.PlayerId
            ].injuryRolls.injuryKO += 1;
            break;
          }
          case "4": {
            matchData.playerData[
              stepMessageData.PlayerId
            ].injuryRolls.injuryCasualty += 1;
            break;
          }
        }
        

        break;
      }
      case "ResultCasualtyRoll": {
        // this doens thappen very frequently, needs testing what it tells us

        // const resultMessageData = xmlToJson(result.MessageData)
        //   .ResultCasualtyRoll as ResultCasualtyRoll;

        // Add ResultCasualtyRoll data to the currentTurnAction
        // currentTurn.injury = true;
        // currentTurnAction.actionsTaken.injuryInflicted = "ResultCasualtyRoll";

        // console.log(
        //   "Injury inflicted",
        //   currentTurnAction.actionsTaken.injuryInflicted
        // );

        break;
      }
      case "ResultPlayerRemoval": {
        // This tells us who was removed from the pitch and why

        // // Not yet used so commenting to save computation
        const resultMessageData = xmlToJson(result.MessageData)
          .ResultPlayerRemoval as ResultPlayerRemoval;

        // Add ResultPlayerRemoval data to the currentTurnAction
        currentTurn.injury ? currentTurn.injury += 1 : currentTurn.injury = 1;

        switch (resultMessageData.Status) {
          case "0": {
            // no need to set injury type as stunned is handeled by the ResultInjuryRoll

            currentTurn.injury ? currentTurn.injury += 1 : currentTurn.injury = 1;
            currentTurn.knockdown ? currentTurn.knockdown += 1 : currentTurn.knockdown = 1;
            currentTurnAction.actionsTaken.knockdownInflicted = 'Stunned - Pushed Out of Bounds';
            break;
          }
          case "3": {
            currentTurnAction.actionsTaken.injuryInflicted = 'KO'
            break;
          }
          case "4": {
            currentTurnAction.actionsTaken.injuryInflicted = 'Serious Injury'
            break;
          }
          case "5": {
            currentTurnAction.actionsTaken.injuryInflicted = 'Death'
            break;
          }
          default: {
            currentTurnAction.actionsTaken.injuryInflicted = resultMessageData.Status
            break;
          }
        }

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
