import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type ResultBlockOutcome = {
  AttackerId: string;
  DefenderId: string;
  Outcome: string;
  Pushbacks: {
    ResultPushBack: {
      CellTo: {
        Y: YPos;
        X: XPos;
      };
      CellFrom: {
        Y: YPos;
        X: XPos;
      };
      Resolution: string;
      PushedPlayerId: string;
    }[];
  };
  Follow: "0" | "1";
};