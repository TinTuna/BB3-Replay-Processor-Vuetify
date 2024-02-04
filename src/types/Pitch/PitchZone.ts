import { XPos } from "./xPos";
import { YPos } from "./yPos";

export type PitchZone = {
  BottomLeft: {
    X: XPos;
    Y: YPos;
  };
  TopRight: {
    X: XPos;
    Y: YPos;
  };
  ZoneType: string;
};
