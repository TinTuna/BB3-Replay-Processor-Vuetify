import { PlayerId } from "../IdTypes/PlayerId";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type EventTouchdown = {
  PlayerId: PlayerId;
  Cell: {
    Y: YPos;
    X: XPos;
  }
};