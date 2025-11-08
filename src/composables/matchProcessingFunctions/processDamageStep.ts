import { Step } from "@/types/Match/Step";
import { xmlToJsonMemoized } from "../helperFns/xmlToJsonMemoized";
import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { Turn } from "@/types/Match/Turn";
import { StepResult } from "@/types/Match/StepResult";
import { TurnAction } from "@/types/Match/TurnAction";
import { ResultPlayerRemoval } from "@/types/messageData/ResultPlayerRemoval";
import { DamageStep } from "@/types/messageData/DamageStep";
import { ResultInjuryRoll } from "@/types/messageData/ResultInjuryRoll";
import { ResultCasualtyRoll } from "@/types/messageData/ResultCasualtyRoll";
import { ResultRoll } from "@/types/messageData/ResultRoll";
import { ResultApothecary } from "@/types/messageData/ResultApothecary";
import { ResultGainSpp } from "@/types/messageData/ResultGainSpp";
import { QuestionApothecaryCasualtyUsage } from "@/types/messageData/QuestionApothecaryCasualtyUsage";
import { ResultTeamRerollUsage } from "@/types/messageData/ResultTeamRerollUsage";
import { PlayerId } from "@/types/IdTypes/PlayerId";
import { processDieRoll } from "../helperFns/processDieRoll";

/**
 * Processes injury outcome based on status/outcome value
 * Handles tracking of injury rolls for both victim and attacker
 */
const processInjuryOutcome = (opts: {
  outcome: string;
  victimId: PlayerId;
  attackerId: PlayerId | undefined;
  matchData: MatchData;
  currentTurn: Turn;
  currentTurnAction: TurnAction;
  context?: {
    step?: ReplayStep;
    stepResult?: Step;
    logPrefix?: string;
  };
}) => {
  const {
    outcome,
    victimId,
    attackerId,
    matchData,
    currentTurn,
    currentTurnAction,
    context,
  } = opts;

  switch (outcome) {
    case "0": {
      // Stunned
      matchData.playerData[victimId].injuryRollsSustained.injuryStunned += 1;

      // Check if this is a self inflicted injury
      if (victimId === attackerId) {
        currentTurnAction.actionsTaken.knockdownSustained = {
          type: "Stunned",
          player: attackerId,
        };
      } else {
        // Track inflicted injury for attacker
        if (attackerId && matchData.playerData[attackerId]) {
          matchData.playerData[
            attackerId
          ].injuryRollsInflicted.injuryRolls += 1;
          matchData.playerData[
            attackerId
          ].injuryRollsInflicted.injuryStunned += 1;
        }

        currentTurn.knockdown
          ? (currentTurn.knockdown += 1)
          : (currentTurn.knockdown = 1);
        currentTurnAction.actionsTaken.knockdownInflicted = {
          type: "Stunned",
          player: victimId,
        };
      }
      break;
    }
    case "1": {
      // unknown outcome (case 1) (what is less than KO?)
      const logPrefix = context?.logPrefix || "[DAMAGE STEP]";
      console.log(`${logPrefix} Unknown injury outcome (case 1)`);
      console.log(`${logPrefix} Outcome:`, outcome);
      console.log(`${logPrefix} Victim:`, victimId);
      console.log(`${logPrefix} Attacker:`, attackerId);
      if (context?.step) {
        console.log(`${logPrefix} Step:`, context.step);
      }
      if (context?.stepResult) {
        console.log(`${logPrefix} Step Result:`, context.stepResult);
      }
      break;
    }
    case "2": {
      // KO
      matchData.playerData[victimId].injuryRollsSustained.injuryKO += 1;

      // Track inflicted injury for attacker (if not self-inflicted)
      if (
        attackerId &&
        attackerId !== victimId &&
        matchData.playerData[attackerId]
      ) {
        matchData.playerData[attackerId].injuryRollsInflicted.injuryRolls += 1;
        matchData.playerData[attackerId].injuryRollsInflicted.injuryKO += 1;
      }
      break;
    }
    case "3": {
      // Badly Hurt (case 3)
      matchData.playerData[victimId].injuryRollsSustained.injuryBadlyHurt += 1;

      // Track inflicted injury for attacker (if not self-inflicted)
      if (
        attackerId &&
        attackerId !== victimId &&
        matchData.playerData[attackerId]
      ) {
        matchData.playerData[attackerId].injuryRollsInflicted.injuryRolls += 1;
        matchData.playerData[
          attackerId
        ].injuryRollsInflicted.injuryBadlyHurt += 1;
      }
      break;
    }
    case "4": {
      // Casualty (case 4)
      matchData.playerData[
        victimId
      ].injuryRollsSustained.injurySeriousInjury += 1;

      // Track inflicted injury for attacker (if not self-inflicted)
      if (
        attackerId &&
        attackerId !== victimId &&
        matchData.playerData[attackerId]
      ) {
        matchData.playerData[attackerId].injuryRollsInflicted.injuryRolls += 1;
        matchData.playerData[
          attackerId
        ].injuryRollsInflicted.injurySeriousInjury += 1;
      }
      break;
    }
    default: {
      // Unknown
      break;
    }
  }
};

export const processDamageStep = (opts: {
  stepResult: Step;
  step: ReplayStep;
  matchData: MatchData;
  currentTurn: Turn;
  currentTurnAction: TurnAction;
  nextTurnAction: TurnAction;
  hasBall: string | undefined;
}) => {
  const { stepResult, step, matchData, currentTurn, currentTurnAction } = opts;
  const stepMessageData = xmlToJsonMemoized(stepResult.Step.MessageData)
    .DamageStep as DamageStep;

  if (!stepMessageData) {
    console.warn("No stepMessageData found in the following step:", step);
    return opts;
  }

  // Create a new turnActionEvent for this event
  const turnActionEvent = {
    eventName: stepResult.Step.Name,
    eventType: stepMessageData.StepType,
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

        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultRoll as ResultRoll;

        // resultMessageData.Difficulty is the modified target number
        // resultMessageData.Dice[] are the dice rolled
        // resultMessageData.Outcome is the result of the roll

        // In DamageStep, TargetId is the victim whose armour is being rolled
        const victimId = stepMessageData.TargetId as PlayerId;

        // add d6 roll data to the playerData
        // check if Dice.Die is an array or a single object
        if (Array.isArray(resultMessageData.Dice.Die)) {
          resultMessageData.Dice.Die.forEach((die) => {
            processDieRoll({
              dieRoll: die,
              playerId: victimId,
              matchData,
            });
          });
        } else {
          processDieRoll({
            dieRoll: resultMessageData.Dice.Die,
            playerId: victimId,
            matchData,
          });
        }

        // add armour roll data to the playerData (victim's armour)
        matchData.playerData[victimId].armourRolls.armourRolls += 1;
        if (resultMessageData.Outcome === "1") {
          matchData.playerData[victimId].armourRolls.armourRollsFailed += 1;
        } else {
          matchData.playerData[victimId].armourRolls.armourRollsPassed += 1;
        }

        if (currentTurn.foulAttempted) {
          // this is a foul attempt
          currentTurnAction.actionsTaken.foulAttempted = {
            foulSuccess: resultMessageData.Outcome === "0",
            fouledPlayer: stepMessageData.TargetId,
          };
        }

        break;
      }
      case "ResultInjuryRoll": {
        // This tells the roll and result of an injury roll (Armour Break), and which player was potentially injured
        // if successful, a ResultCasualtyRoll will follow

        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultInjuryRoll as ResultInjuryRoll;

        // add injury roll data to the playerData
        // stepMessageData.TargetId is the victim
        // currentTurnAction.playerId is the attacker
        const victimId = stepMessageData.TargetId as PlayerId;
        const attackerId = currentTurnAction.playerId as PlayerId;

        // Process injury roll dice for the victim
        if (Array.isArray(resultMessageData.Dice.Die)) {
          resultMessageData.Dice.Die.forEach((die) => {
            processDieRoll({
              dieRoll: die,
              playerId: victimId,
              matchData,
            });
          });
        } else {
          processDieRoll({
            dieRoll: resultMessageData.Dice.Die,
            playerId: victimId,
            matchData,
          });
        }

        // Track sustained injury for victim
        matchData.playerData[victimId].injuryRollsSustained.injuryRolls += 1;

        processInjuryOutcome({
          outcome: resultMessageData.Outcome,
          victimId,
          attackerId,
          matchData,
          currentTurn,
          currentTurnAction,
          context: {
            step,
            logPrefix: "ResultInjuryRoll",
          },
        });

        break;
      }
      case "ResultCasualtyRoll": {
        // This doesn't happen very frequently, needs testing what it tells us

        const casualtyRollData = xmlToJsonMemoized(result.MessageData)
          .ResultCasualtyRoll as ResultCasualtyRoll;

        // In DamageStep, TargetId is the victim receiving the casualty roll
        // currentTurnAction.playerId is the attacker
        const victimId = stepMessageData.TargetId as PlayerId;

        // Process the casualty dice (2d6 roll)
        // Note: casualty roll uses lowercase 'dice.die' not 'Dice.Die'
        if (casualtyRollData.dice?.die) {
          casualtyRollData.dice.die.forEach((die) => {
            processDieRoll({
              dieRoll: die,
              playerId: victimId,
              matchData,
            });
          });
        }
        break;
      }
      case "QuestionApothecaryCasualtyUsage": {
        // This is asked when a casualty occurs and the team has an apothecary available
        // It contains the casualty roll data in RollInfos
        // If this question appears, ResultInjuryRoll is skipped
        // The casualty roll outcome determines what injury the player will get
        // After this question, ResultApothecary will appear with the final status

        const questionData = xmlToJsonMemoized(result.MessageData)
          .QuestionApothecaryCasualtyUsage as QuestionApothecaryCasualtyUsage;

        // In DamageStep, TargetId is the victim receiving the casualty roll
        const victimId = stepMessageData.TargetId as PlayerId;

        // Process the casualty dice from RollInfos (2d6 roll)
        // This is the casualty roll that determines the injury severity
        if (Array.isArray(questionData.RollInfos.Dice.Die)) {
          questionData.RollInfos.Dice.Die.forEach((die) => {
            processDieRoll({
              dieRoll: die,
              playerId: victimId,
              matchData,
            });
          });
        } else {
          processDieRoll({
            dieRoll: questionData.RollInfos.Dice.Die,
            playerId: victimId,
            matchData,
          });
        }

        // TODO: Track the casualty roll outcome as ResultPlayerRemoval is not called :(

        // Note: The actual injury tracking will be handled by ResultApothecary
        // which appears after the player decides whether to use the apothecary

        break;
      }
      case "ResultPlayerRemoval": {
        // This tells us who was removed from the pitch and why
        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultPlayerRemoval as ResultPlayerRemoval;

        // Add ResultPlayerRemoval data to the currentTurnAction

        // Get victim and attacker IDs
        const victimId = resultMessageData.PlayerId as PlayerId;
        const attackerId = currentTurnAction.playerId as PlayerId;

        // Map status codes to injury types and casualty tracking fields
        const statusMap: Record<
          string,
          {
            injuryType: string;
            casualtyField?: keyof MatchData["playerData"][string]["casualtiesInflicted"];
          }
        > = {
          "0": { injuryType: "Stunned - Pushed Out of Bounds" },
          "1": {
            injuryType: "Badly Hurt",
            casualtyField: "casualtyBadlyHurt",
          },
          "2": {
            injuryType: "Seriously Hurt",
            casualtyField: "casualtySeriouslyHurt",
          },
          "3": {
            injuryType: "Serious Injury",
            casualtyField: "casualtySeriousInjury",
          },
          "4": {
            injuryType: "Lasting Injury",
            casualtyField: "casualtyLastingInjury",
          },
          "5": { injuryType: "Death", casualtyField: "casualtyDeath" },
        };

        const statusInfo =
          statusMap[resultMessageData.Status] ||
          ({ injuryType: resultMessageData.Status } as const);
        const injuryType = statusInfo.injuryType;

        // Track casualties inflicted for attacker (if not self-inflicted and status is a casualty)
        if (
          statusInfo.casualtyField &&
          attackerId &&
          attackerId !== victimId &&
          matchData.playerData[attackerId]
        ) {
          const attackerCasualties =
            matchData.playerData[attackerId].casualtiesInflicted;
          attackerCasualties.casualtyRolls += 1;

          // Update the specific casualty field based on status
          switch (statusInfo.casualtyField) {
            case "casualtyBadlyHurt":
              attackerCasualties.casualtyBadlyHurt += 1;
              break;
            case "casualtySeriouslyHurt":
              attackerCasualties.casualtySeriouslyHurt += 1;
              break;
            case "casualtySeriousInjury":
              attackerCasualties.casualtySeriousInjury += 1;
              break;
            case "casualtyLastingInjury":
              attackerCasualties.casualtyLastingInjury += 1;
              break;
            case "casualtyDeath":
              attackerCasualties.casualtyDeath += 1;
              break;
          }
        }

        // Check if this was a self inflicted injury
        if (victimId === attackerId) {
          currentTurnAction.actionsTaken.injurySustained = {
            type: injuryType,
            player: victimId,
          };
          currentTurn.injurySustained
            ? (currentTurn.injurySustained += 1)
            : (currentTurn.injurySustained = 1);
          currentTurn.knockdownSustained
            ? (currentTurn.knockdownSustained += 1)
            : (currentTurn.knockdownSustained = 1);
        } else {
          currentTurnAction.actionsTaken.injuryInflicted = {
            type: injuryType,
            player: victimId,
          };
          currentTurn.injury
            ? (currentTurn.injury += 1)
            : (currentTurn.injury = 1);
          currentTurn.knockdown
            ? (currentTurn.knockdown += 1)
            : (currentTurn.knockdown = 1);
        }

        // add roll data to the matchData
        matchData.playerData[victimId].timesRemovedFromPlay += 1;

        break;
      }
      case "ResultTeamRerollUsage": {
        // This tells us a reroll was used and by which _player_ (not by which team)
        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultTeamRerollUsage as ResultTeamRerollUsage;

        // Track reroll usage for this action (can be used for injury rolls)
        if (resultMessageData.Used === 1) {
          currentTurnAction.actionsTaken.rerollUsed = true;
        }
        break;
      }
      case "ResultApothecary": {
        // This tells us about apothecary usage after an injury

        // TODO: Work out why for the ResultInjuryRoll the values 0-5 are slightly different to the ResultPlayerRemoval values 0-5

        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultApothecary as ResultApothecary;

        // add injury roll data to the playerData
        // stepMessageData.TargetId is the victim
        // currentTurnAction.playerId is the attacker
        const victimId = stepMessageData.TargetId as PlayerId;
        const attackerId = currentTurnAction.playerId as PlayerId;

        // If the Apothecary is questioned, even if not used, ResultInjuryRoll is skipped. So we need to track the data in the same way as ResultInjuryRoll.
        // This is the same for ResultCasualtyRoll.
        if (resultMessageData.ApothecaryUsed === "0") {
          // Apothecary was not used
        } else if (resultMessageData.ApothecaryUsed === "1") {
          // Apothecary was used
          const victimTeamId = matchData.playerData[victimId]?.teamId as "0" | "1";
          if (victimTeamId === "0" || victimTeamId === "1") {
            matchData.teamStats[victimTeamId].apothecaryUsed += 1;
          }
        }

        processInjuryOutcome({
          outcome: resultMessageData.PlayerStatus,
          victimId,
          attackerId,
          matchData,
          currentTurn,
          currentTurnAction,
          context: {
            step,
            logPrefix: "ResultApothecary",
          },
        });

        // TODO: Track apothecary usage if needed
        // For now, we just log it to understand the structure
        if (resultMessageData.ApothecaryUsed === "1") {
          // Apothecary was used - might want to track this
        }

        break;
      }
      case "ResultGainSpp": {
        // This tells us that a player gained SPP (usually from inflicting a casualty)
        // PlayerId: The player who gained SPP (likely the attacker)
        // SppGained: The amount of SPP gained
        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultGainSpp as ResultGainSpp;

        // TODO: Track SPP gained if needed
        // SPP is typically tracked at the end of match processing, not during step processing
        // but we could log it or add it to a tracking structure if needed

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
