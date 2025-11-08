import { PlayerId } from "../IdTypes/PlayerId";
import { TurnActionEvent } from "./TurnActionEvent";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type Cell = {
  X: XPos;
  Y: YPos;
};

export type ActionPitchState = {
  playerPositions: { [playerId: string]: { x: XPos; y: YPos } };
  ballPosition: {
    x: XPos;
    y: YPos;
    isHeld: boolean;
    isAirborne: boolean;
    heldBy?: string;
  } | null;
};

export type PushPath = {
  from: Cell;
  to: Cell;
  pushedPlayerId: PlayerId;
};

export type TurnAction = {
  playerId?: PlayerId;
  hasBall?: PlayerId | undefined;
  turnActionEvents: TurnActionEvent[];
  pendingCatchAction?: TurnAction; // Catch action that should be added after this action
  movementPath?: Cell[]; // Array of cells stepped into during this action (includes starting position and each square moved to)
  pushPaths?: PushPath[]; // Array of push actions showing where opponents were pushed
  pitchState?: ActionPitchState; // Board state at the start of this action
  actionsTaken: {
    standUp?: boolean;
    yardsMoved?: number;
    blockAttempted?:
      | "attackerDown"
      | "bothDown"
      | "push"
      | "defenderStumbles"
      | "defenderDown";
    blockOutcome?:
      | "attackerDown"
      | "bothDown"
      | "push"
      | "defenderDownPushBack"
      | "defenderDownNoPush";
    injuryInflicted?: {
      type?: string;
      player?: PlayerId;
    };
    injurySustained?: {
      type?: string;
      player?: PlayerId;
    };
    knockdownInflicted?: {
      type?: string;
      player?: PlayerId;
    };
    knockdownSustained?: {
      type?: string;
      player?: PlayerId;
    };
    touchdownScored?: boolean;
    passAttempted?: {
      passType?: "quick" | "short" | "long" | "bomb";
      passSuccess?: boolean;
      passDistance?: number;
      receiverId?: PlayerId;
    };
    handoffAttempted?: {
      handoffSuccess?: boolean;
      receiverId?: PlayerId;
    };
    catchAttempted?: {
      catchSuccess?: boolean;
    };
    pickupAttempted?: {
      pickupSuccess?: boolean;
    };
    foulAttempted?: {
      foulSuccess?: boolean;
      fouledPlayer?: PlayerId;
    };
    sentOff?: boolean;
    rerollUsed?: boolean;
  };
};
