import { PlayerId } from "../IdTypes/PlayerId";

export type ResultPlayerRemoval = {
  PlayerId: PlayerId;
  Situation: string;
  Reason: string;
  Status: string;
};