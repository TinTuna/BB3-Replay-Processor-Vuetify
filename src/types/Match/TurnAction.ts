import { PlayerId } from "../IdTypes/PlayerId";
import { TurnActionEvent } from "./TurnActionEvent";

export type TurnAction = {
  playerId?: PlayerId;
  hasBall?: PlayerId | undefined;
  turnActionEvents: TurnActionEvent[];
  actionsTaken: {
    standUp?: boolean;
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
  };
};
