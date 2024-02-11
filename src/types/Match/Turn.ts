import { TurnAction } from "./TurnAction";

export type Turn = {
    team: "0" | "1";
    turn: number;
    turnActions: TurnAction[];
}