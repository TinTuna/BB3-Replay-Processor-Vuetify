import { PlayerId } from "../IdTypes/PlayerId";
import { TurnAction } from "./TurnAction";

export type Turn = {
  team: "0" | "1";
  turn: number;
  turnActions: TurnAction[];
  touchdown?: boolean;
  touchdownScorer?: PlayerId;
  injury?: boolean;
  knockdown?: boolean;
  death?: boolean;
  turnover?: boolean;
};
