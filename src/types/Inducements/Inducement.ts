import { InducementIdTypes } from "../IdTypes/InducementIdTypes";
import { Player } from "../Teams/Player";

export type Inducement = {
  Cost: string;
  Max: string;
  Type: InducementIdTypes;
  Players: {
    PlayerData: Player;
  };
};
