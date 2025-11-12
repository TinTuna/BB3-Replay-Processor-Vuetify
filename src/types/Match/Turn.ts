import { PlayerId } from "../IdTypes/PlayerId";
import { TurnAction } from "./TurnAction";

export type GamePeriod = "First Half" | "Second Half" | "Overtime";

export type Turn = {
  team: "0" | "1";
  turn: number;
  period: GamePeriod;
  turnActions: TurnAction[];
  touchdown?: boolean;
  touchdownScorer?: PlayerId;
  injury?: number;
  injurySustained?: number;
  knockdown?: number;
  knockdownSustained?: number;
  death?: number;
  turnover?: boolean;
  foulAttempted?: boolean;
  sentOff?: boolean;
};
