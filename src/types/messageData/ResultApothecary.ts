import { PlayerId } from "../IdTypes/PlayerId";
import { PlayerStatus } from "./PlayerStatus";

export type ResultApothecary = {
  PlayerStatus: PlayerStatus;
  ApothecaryUsed: "0" | "1"; // 0 = not used, 1 = used
  Casualty: string;
  IsInjury: string;
};
