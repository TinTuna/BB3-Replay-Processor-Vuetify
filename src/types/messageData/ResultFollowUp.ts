import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type ResultFollowUp = {
  Follow: "0" | "1";
  CellFrom: {
    Y: YPos;
    X: XPos;
  };
  CellTo: {
    Y: YPos;
    X: XPos;
  };
};
