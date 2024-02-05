import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type ResultPushBack = {
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
};