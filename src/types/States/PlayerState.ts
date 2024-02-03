import { Player } from "../Teams/Player";

export type PlayerState = {
  CanAct: string;
  Cell: {
    Y: string;
    X: string;
  };
  Data: Player;
  Effects: {};
  Gfi: string;
  Id: string;
  MovePoint: string;
  Situation: string;
  TackleZone: string;
};
