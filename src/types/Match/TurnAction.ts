import { PlayerId } from "../IdTypes/PlayerId";
import { TurnActionEvent } from "./TurnActionEvent";

export type TurnAction = {
    playerId?: PlayerId;
    turnActionEvents: TurnActionEvent[];
}