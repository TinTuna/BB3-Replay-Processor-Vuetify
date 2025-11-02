import { PlayerId } from "../IdTypes/PlayerId";
import { PlayerStatus } from "./PlayerStatus";

export type ResultPlayerRemoval = {
  PlayerId: PlayerId;
  Situation: string;
  Reason: string;
  Status: PlayerStatus;
};
