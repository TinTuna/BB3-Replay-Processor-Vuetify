import { PlayerId } from "../IdTypes/PlayerId";
import { TurnActionEvent } from "./TurnActionEvent";

export type TurnAction = {
  playerId?: PlayerId;
  hasBall?: PlayerId | undefined;
  turnActionEvents: TurnActionEvent[];
  actionsTaken: {
    yardsMoved?: number;
    blockAttempted?: 'attackerDown' | 'bothDown' | 'push' | 'defenderStumbles' | 'defenderDown';
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
      passType?: |'quick' | 'short' | 'long' | 'bomb';
      passSuccess?: Boolean;
      passDistance?: number;
      receiverId?: PlayerId;
    };
    handoffAttempted?: {
      handoffSuccess?: Boolean;
      receiverId?: PlayerId;
    };
    catchAttempted?: {
      catchSuccess?: Boolean;
    };
    pickupAttempted?: {
      pickupSuccess?: Boolean;
    };
  };
};
