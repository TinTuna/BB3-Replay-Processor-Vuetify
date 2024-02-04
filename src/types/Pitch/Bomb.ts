import { XPos } from "./xPos";
import { YPos } from "./yPos";

export type Bomb = {
  Cell: {
    X: XPos;
    Y: YPos;
  };
  IsAirborne: string;
  IsHeld: string;
};
