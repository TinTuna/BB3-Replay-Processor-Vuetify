import { PlayerIdType } from "../IdTypes/PlayerIdTypes";
import { Characteristic } from "./Characteristic";

export type Player = {
  AcquiredSkills: [];
  Characteristics: {
    PlayerCharacteristic: Characteristic[];
  };
  Contract: string;
  Customization: {
    Parts: {
      PartsItem: string[];
    };
  };
  Dead: string;
  Experience: string;
  Id: string;
  IdPlayerTypes: PlayerIdType;
  InnateSkills: {
    InnateSkillsItem: string;
  };
  Level: string;
  ListCasualties: {};
  LobbyId: string;
  Name: string;
  Number: string;
  TeamId: string;
  Value: string;
};
