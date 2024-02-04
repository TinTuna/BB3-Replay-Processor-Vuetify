import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";
import { Player } from "../Teams/Player";

export type PlayerState = {
  CanAct: string;
  Cell: {
    Y: XPos;
    X: YPos;
  };
  Data: Player;
  Effects: {};
  Gfi: string;
  Id: string;
  MovePoint: string;
  Situation: string;
  TackleZone: string;
};
