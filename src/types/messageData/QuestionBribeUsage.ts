import { PlayerId } from "../IdTypes/PlayerId";

export type QuestionBribeUsage = {
  GamerId: "0" | "1";
  PlayerId: PlayerId;
  Reason: string;
  ArgueAvailable: "0" | "1";
  BribeAvailable: "0" | "1";
};