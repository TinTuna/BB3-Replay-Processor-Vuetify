import { PlayerId } from "../IdTypes/PlayerId";
import { TurnActionEvent } from "./TurnActionEvent";

export type TurnAction = {
  playerId?: PlayerId;
  turnActionEvents: TurnActionEvent[];
  actionsTaken: {
    yardsMoved?: number;
    blocksAttempted?: number;
    blocksSucceeded?: number;
    injuriesInflicted?: number;
    touchdownsScored?: number;
  };
};
