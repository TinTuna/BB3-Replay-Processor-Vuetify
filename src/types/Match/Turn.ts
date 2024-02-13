import { TurnAction } from "./TurnAction";

export type Turn = {
    team: "0" | "1";
    turn: number;
    turnActions: TurnAction[];
    touchdown?: boolean;
    injury?: boolean;
    death?: boolean;
    turnover?: boolean;
}