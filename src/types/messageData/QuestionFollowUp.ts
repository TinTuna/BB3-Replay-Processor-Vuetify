import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type QuestionFollowUp = {
  GamerId: string;
  CellTo: {
    Y: YPos;
    X: XPos;
  };
  CellFrom: {
    Y: YPos;
    X: XPos;
  };
};