import { PlayerId } from "../IdTypes/PlayerId";
import { TurnActionEvent } from "./TurnActionEvent";

export type TurnAction = {
  playerId?: PlayerId;
  turnActionEvents: TurnActionEvent[];
  actionsTaken: {
    yardsMoved?: number;
    blockAttempted?: 'attackerDown' | 'bothDown' | 'push' | 'defenderStumbles' | 'defenderDown';
    injuryInflicted?: string;
    injurySustained?: string;
    knockdownInflicted?: string;
    knockdownSustained?: string;
    touchdownScored?: boolean;
  };
};
