import { PlayerId } from "../IdTypes/PlayerId";
import { TurnAction } from "./TurnAction";

export type Turn = {
  team: "0" | "1";
  turn: number;
  turnActions: TurnAction[];
  touchdown?: boolean;
  touchdownScorer?: PlayerId;
  injury?: number;
  injurySustained?: number;
  knockdown?: number;
  death?: number;
  turnover?: boolean;
};
