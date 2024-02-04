import { XPos } from "./xPos";
import { YPos } from "./yPos";

export type Ball = {
  Cell: {
    X: XPos;
    Y: YPos;
  };
  IsAirborne: string;
  IsHeld: string;
};
