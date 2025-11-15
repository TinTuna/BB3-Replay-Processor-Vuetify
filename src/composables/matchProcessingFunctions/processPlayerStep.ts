import { Step } from "@/types/Match/Step";
import { xmlToJsonMemoized } from "../helperFns/xmlToJsonMemoized";
import { PlayerStep } from "@/types/messageData/PlayerStep";
import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { PlayerId } from "@/types/IdTypes/PlayerId";
import { Turn } from "@/types/Match/Turn";
import { StepResult } from "@/types/Match/StepResult";
import { TurnAction } from "@/types/Match/TurnAction";
import { ResultBlockOutcome } from "@/types/messageData/ResultBlockOutcome";
import { ResultBlockRoll } from "@/types/messageData/ResultBlockRoll";
import { ResultPlayerRemoval } from "@/types/messageData/ResultPlayerRemoval";
import { ResultRoll } from "@/types/messageData/ResultRoll";
import { ResultUseAction } from "@/types/messageData/ResultUseAction";
import { ResultPlayerSentOff } from "@/types/messageData/ResultPlayerSentOff";
import { QuestionBlockDice } from "@/types/messageData/QuestionBlockDice";
import { ResultPushBack } from "@/types/messageData/ResultPushBack";
import { ResultTeamRerollUsage } from "@/types/messageData/ResultTeamRerollUsage";
import { PushPath } from "@/types/Match/TurnAction";
import { addBasePlayerData } from "./addBasePlayerData";
import { processDieRoll } from "../helperFns/processDieRoll";
import { extractPitchState } from "./processReplaySteps";
import { XPos } from "@/types/Pitch/xPos";
import { YPos } from "@/types/Pitch/yPos";

export const processPlayerStep = (opts: {
  stepResult: Step;
  step: ReplayStep;
  matchData: MatchData;
  currentTurn: Turn;
  previousTurnAction: TurnAction;
  currentTurnAction: TurnAction;
  nextTurnAction: TurnAction;
  hasBall: PlayerId | undefined;
  lastKnownLocation?: { [playerId: string]: { x: XPos; y: YPos } };
}) => {
  const {
    stepResult,
    step,
    matchData,
    currentTurn,
    previousTurnAction,
    currentTurnAction,
    nextTurnAction,
    hasBall,
    lastKnownLocation,
  } = opts;
  const stepMessageData = xmlToJsonMemoized(stepResult.Step.MessageData)
    .PlayerStep as PlayerStep;

  if (!stepMessageData) {
    console.warn("No stepMessageData found in the following step:", step);
    return opts;
  }

  if (!matchData.playerData[stepMessageData.PlayerId]) {
    // A star player or mercenary that wasn't initialized at the start
    addBasePlayerData(
      matchData,
      currentTurn.team,
      stepMessageData.PlayerId as PlayerId
    );
  }

  // Store the step name before it gets shadowed in the forEach loop
  const stepName = stepResult.Step.Name;

  // Create a new turnActionEvent for this event
  const turnActionEvent = {
    eventName: stepName,
    eventType: stepMessageData.StepType,
    eventResults: [] as StepResult[],
  };

  // Log what type of step we are processing if necessary
  switch (stepMessageData.StepType) {
    case "0":
      // TODO: This is not true, we need to find anotehr way to see if the player is standing up
      // If this player is moving to cell -1 -1, they are standing up
      if (
        stepMessageData.CellTo.X === "-1" &&
        stepMessageData.CellTo.Y === "-1"
      ) {
        // currentTurnAction.actionsTaken.standUp = true;
      }
      if (
        stepMessageData.CellTo.X === stepMessageData.CellFrom.X &&
        stepMessageData.CellTo.Y === stepMessageData.CellFrom.Y
      ) {
        // currentTurnAction.actionsTaken.standUp = true;
      }
      break;
    case "1":
      break;
    case "2":
      // debugger
      break;
    case "3":
      // debugger
      break;
    case "4":
      // This is a catch step
      // this will all be handled in the ResultRoll section as we need to process the roll result before we know what happened
      break;
    case "5":
      // Attempted handoff
      currentTurnAction.actionsTaken.handoffAttempted = {};
      currentTurnAction.actionsTaken.handoffAttempted.receiverId =
        stepMessageData.TargetId;
      break;
    case "6":
      // debugger
      break;
    case "7":
      // debugger
      break;
    case "8":
      // debugger
      break;
    case "9":
      // debugger
      break;
    case "10":
      // debugger
      break;
    case "11":
      // Attempted Pass
      currentTurnAction.actionsTaken.passAttempted = {};
      currentTurnAction.actionsTaken.passAttempted.receiverId =
        stepMessageData.TargetId;
      break;
    default:
      // debugger
      break;
  }

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
        // Two yards per square on the pitch

        // add move data to the matchData
        matchData.playerData[stepMessageData.PlayerId].yardsMoved += 2;

        // Add move data to the currentTurnAction
        currentTurnAction.actionsTaken.yardsMoved
          ? (currentTurnAction.actionsTaken.yardsMoved += 2)
          : (currentTurnAction.actionsTaken.yardsMoved = 2);

        // If the player has the ball, we need to track the yards moved with the ball
        if (stepMessageData.PlayerId === hasBall) {
          matchData.playerData[
            stepMessageData.PlayerId
          ].yardsMovedWithBall += 2;
        }

        // Track the movement path for visualization
        // Initialize movementPath if it doesn't exist
        if (!currentTurnAction.movementPath) {
          currentTurnAction.movementPath = [];
        }

        // If this is the first movement, add the starting position (CellFrom)
        if (currentTurnAction.movementPath.length === 0) {
          currentTurnAction.movementPath.push({
            X: stepMessageData.CellFrom.X,
            Y: stepMessageData.CellFrom.Y,
          });
        }

        // Add the destination cell (CellTo) to the movement path
        currentTurnAction.movementPath.push({
          X: stepMessageData.CellTo.X,
          Y: stepMessageData.CellTo.Y,
        });

        break;
      }
      case "QuestionBlockDice": {
        // This is the roll of the block dice, this gives info on what dice were rolled and the outcome
        // it also lets us know what rerolls can be used (such as Pro) and whether the defender selects the outcome

        const blockDiceData = xmlToJsonMemoized(result.MessageData)
          .QuestionBlockDice as QuestionBlockDice;

        // Process the block dice that were rolled
        // check if Dice.Die is an array or a single object
        if (Array.isArray(blockDiceData.Dice.Die)) {
          blockDiceData.Dice.Die.forEach((die) => {
            processDieRoll({
              dieRoll: die,
              playerId: stepMessageData.PlayerId,
              matchData,
            });
          });
        } else {
          processDieRoll({
            dieRoll: blockDiceData.Dice.Die,
            playerId: stepMessageData.PlayerId,
            matchData,
          });
        }
        break;
      }
      case "QuestionPushBack": {
        // This is the outcome when a player selected a pushback outcome from a block roll

        // TODO: Process pushback
        // Stats are handled by ResultBlockRoll
        break;
      }
      case "QuestionFollowUp": {
        // This is an intermediate step that relays the information on which cell the target was pushed from and to
        break;
      }
      case "ResultFollowUp": {
        // This tells us the choice of whether the attacker followed up or not
        // TODO: Process follow-up
        // TODO: Track follow-up statistics
        break;
      }
      case "ResultBlockRoll": {
        // This tells us which block dice was selected in a block roll

        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultBlockRoll as ResultBlockRoll;

        // Increment blocks attempted counter
        matchData.playerData[stepMessageData.PlayerId].blocksAttempted += 1;

        // The resultMessageData.ResultBlockRoll.Die.Value is the value of the die rolled
        switch (resultMessageData.Die.Value) {
          case "0":
            // Attacker Down
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.attackerDown += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "attackerDown";
            break;
          case "1":
            // Both Down
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.bothDown += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "bothDown";
            break;
          case "2":
            // Push
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.push += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "push";
            break;
          case "3":
            // Defender Stumbles
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.defenderStumbles += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "defenderStumbles";
            break;
          case "4":
            // Defender Down
            matchData.playerData[
              stepMessageData.PlayerId
            ].blockDiceTaken.defenderDown += 1;
            // Add block data to the currentTurnAction
            currentTurnAction.actionsTaken.blockAttempted = "defenderDown";
            break;
          default:
            // No result
            console.log(
              "Unknown resultMessageData.Die.Value",
              resultMessageData.Die.Value
            );
            break;
        }

        break;
      }
      case "ResultPushBack": {
        // This tells us which player was pushed, and to which cell
        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultPushBack as ResultPushBack;

        // Initialize pushPaths array if it doesn't exist
        if (!currentTurnAction.pushPaths) {
          currentTurnAction.pushPaths = [];
        }

        // Add the push path to track where the opponent was pushed
        currentTurnAction.pushPaths.push({
          from: {
            X: resultMessageData.CellFrom.X,
            Y: resultMessageData.CellFrom.Y,
          },
          to: {
            X: resultMessageData.CellTo.X,
            Y: resultMessageData.CellTo.Y,
          },
          pushedPlayerId: resultMessageData.PushedPlayerId,
        });

        break;
      }
      case "ResultBlockOutcome": {
        // ResultBlockOutcome is an overview of the block action.
        // For the moment we will use this section to count blocks and block outcomes

        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultBlockOutcome as ResultBlockOutcome;

        // Process pushbacks if they exist
        if (resultMessageData.Pushbacks?.ResultPushBack) {
          // Initialize pushPaths array if it doesn't exist
          if (!currentTurnAction.pushPaths) {
            currentTurnAction.pushPaths = [];
          }

          // Handle both single pushback and array of pushbacks
          const pushbacks = Array.isArray(
            resultMessageData.Pushbacks.ResultPushBack
          )
            ? resultMessageData.Pushbacks.ResultPushBack
            : [resultMessageData.Pushbacks.ResultPushBack];

          pushbacks.forEach((pushback) => {
            currentTurnAction.pushPaths!.push({
              from: {
                X: pushback.CellFrom.X,
                Y: pushback.CellFrom.Y,
              },
              to: {
                X: pushback.CellTo.X,
                Y: pushback.CellTo.Y,
              },
              pushedPlayerId: pushback.PushedPlayerId,
            });

            // Update lastKnownLocation with the pushed player's new position
            if (lastKnownLocation && pushback.PushedPlayerId) {
              lastKnownLocation[pushback.PushedPlayerId] = {
                x: pushback.CellTo.X as XPos,
                y: pushback.CellTo.Y as YPos,
              };
            }
          });
        }

        // The resultMessageData.Outcome is the overall resulting action of the block roll
        switch (resultMessageData.Outcome) {
          case "0":
            // Attacker Down
            currentTurnAction.actionsTaken.blockOutcome = "attackerDown";
            break;
          case "1":
            // Both Down
            currentTurnAction.actionsTaken.blockOutcome = "bothDown";
            break;
          // case "2":
          //   // ?
          //   console.log("Unknown resultMessageData.Outcome", resultMessageData.Outcome);
          //   break;
          // case "3":
          //   // ?
          //   console.log("Unknown resultMessageData.Outcome", resultMessageData.Outcome);
          //   break;
          case "4":
            // Push
            currentTurnAction.actionsTaken.blockOutcome = "push";
            break;
          case "5":
            // Defender Down
            currentTurnAction.actionsTaken.blockOutcome = "defenderDownNoPush";
            break;
          case "6":
            // Defender Down
            currentTurnAction.actionsTaken.blockOutcome =
              "defenderDownPushBack";
            break;
          default:
            // Unknown outcome
            console.log(
              "Unknown resultMessageData.Outcome",
              resultMessageData.Outcome
            );
            break;
        }

        break;
      }
      case "ResultRoll": {
        // This tells us the result of a roll
        // it has data such as the type of roll, the value rolled and the target value
        // it also tells us if the roll was a success or a failure

        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultRoll as ResultRoll;

        // Process the dice rolled
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

        // if this is a pass roll, we can add some data to the playerData
        if (stepMessageData.StepType === "11") {
          if (!currentTurnAction.actionsTaken.passAttempted) {
            currentTurnAction.actionsTaken.passAttempted = {};
          }
          currentTurnAction.actionsTaken.passAttempted.passSuccess = Boolean(
            resultMessageData.Outcome === "1"
          );
        }

        // We can check if this ResultRoll was a Catch
        if (stepMessageData.StepType === "4") {
          let catchingPlayerId: PlayerId | undefined;

          // Determine if this is a catch from a pass or handoff
          if (
            currentTurnAction.actionsTaken.passAttempted &&
            currentTurnAction.actionsTaken.passAttempted.receiverId ===
              stepMessageData.PlayerId
          ) {
            catchingPlayerId =
              currentTurnAction.actionsTaken.passAttempted.receiverId;
          } else if (
            currentTurnAction.actionsTaken.handoffAttempted &&
            currentTurnAction.actionsTaken.handoffAttempted.receiverId ===
              stepMessageData.PlayerId
          ) {
            catchingPlayerId =
              currentTurnAction.actionsTaken.handoffAttempted.receiverId;
          }

          // If we identified a catch, create a separate turn action for the catching player
          if (catchingPlayerId) {
            // Create a new turn action specifically for the catching player
            // This ensures we don't incorrectly modify nextTurnAction which may be for a different player
            const catchTurnAction: TurnAction = {
              playerId: catchingPlayerId,
              turnActionEvents: [
                {
                  eventName: stepName,
                  eventType: stepMessageData.StepType,
                  eventResults: [stepResult],
                },
              ],
              actionsTaken: {
                catchAttempted: {
                  catchSuccess: resultMessageData.Outcome === "1",
                },
              },
              // Capture the pitch state at the moment of the catch
              pitchState: extractPitchState(step, lastKnownLocation),
            };

            // Store the catch action on currentTurnAction so it can be added after currentTurnAction
            // This ensures the catch action appears in the correct sequence (after the pass/handoff action)
            currentTurnAction.pendingCatchAction = catchTurnAction;
          } else {
            // this happens sometimes but I'm not sure what it is yet
          }
        }

        // We need to check if the player has moved to the space that contains the ball or the ball has moved to the player
        // If so, this roll is a catch attempt
        if (
          !currentTurnAction.actionsTaken.passAttempted &&
          !currentTurnAction.actionsTaken.handoffAttempted &&
          previousTurnAction?.hasBall !== currentTurnAction.playerId &&
          stepMessageData.CellTo.X === step.BoardState.Ball.Cell?.X &&
          stepMessageData.CellTo.Y === step.BoardState.Ball.Cell?.Y
        ) {
          currentTurnAction.actionsTaken.pickupAttempted = {};
          currentTurnAction.actionsTaken.pickupAttempted.pickupSuccess =
            resultMessageData.Outcome === "1";
        }

        break;
      }
      case "ResultSkillUsage": {
        // This tells us the skill used, and by which player
        // TODO: Process skill usage
        // TODO: Track skill usage
        break;
      }
      case "ResultInjuryRoll": {
        // This tells the roll and result of an injury roll (Armour Break), and which player was potentially injured
        // if successful, a ResultCasualtyRoll will follow
        // NOTE: ResultInjuryRoll is processed in processDamageStep.ts (DamageStep is specifically for injuries)
        // This case exists here for documentation but should not process the injury to avoid double-counting
        break;
      }
      case "ResultCasualtyRoll": {
        // This is called when an armour break is successful and the injury roll is made
        // on a roll of 8-12, a ResultPlayerRemoval will follow
        // NOTE: ResultCasualtyRoll is processed in processDamageStep.ts (DamageStep is specifically for damage/injuries)
        // This case exists here for documentation but should not process to avoid double-counting

        currentTurnAction.actionsTaken.injuryInflicted = {
          type: "injuryInflicted",
          player: stepMessageData.TargetId, // The victim who received the injury
        };
        break;
      }
      case "ResultPlayerRemoval": {
        // This tells us who was removed from the pitch and why
        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultPlayerRemoval as ResultPlayerRemoval;

        // add roll data to the matchData
        matchData.playerData[
          resultMessageData.PlayerId
        ].timesRemovedFromPlay += 1;

        break;
      }
      case "ResultTeamRerollUsage": {
        // This tells us a reroll was used and by which _player_ (not by which team)
        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultTeamRerollUsage as ResultTeamRerollUsage;

        // Track reroll usage for this action
        if (resultMessageData.Used === 1) {
          currentTurnAction.actionsTaken.rerollUsed = true;
        }
        break;
      }
      case "ResultUseAction": {
        const resultMessageData = xmlToJsonMemoized(result.MessageData)
          .ResultUseAction as ResultUseAction;

        if (resultMessageData.Action === "6") {
          // foul action
          currentTurn.foulAttempted = true;
        }

        break;
      }
      case "QuestionBribeUsage": {
        // Question about using a bribe
        // TODO: Process bribe usage
        // TODO: Track bribe usage
        break;
      }
      case "ResultPlayerSentOff": {
        // This tells us a player was sent off and why
        currentTurnAction.actionsTaken.sentOff = true;
        currentTurn.sentOff = true;
        break;
      }
      case "ResultDoMove": {
        // Player movement result
        // TODO: Process do move
        // TODO: Track do move
        break;
      }
      default: {
        break;
      }
    }

    // Add the result to the turnActionEvent
    turnActionEvent.eventResults.push(stepResult);
  });

  // add the ballcarrier to the currentTurnAction
  currentTurnAction.hasBall = hasBall;

  // Add the turnActionEvent to the currentTurnAction
  currentTurnAction.turnActionEvents.push(turnActionEvent);

  // if (currentTurnAction.actionsTaken.passAttempted) debugger;

  return opts;
};
