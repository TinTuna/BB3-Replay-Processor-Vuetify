import { PlayerId } from "../IdTypes/PlayerId";
import { PlayerIdType } from "../IdTypes/PlayerIdTypes";
import { SkillId } from "../IdTypes/SkillId";
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
  Id: PlayerId;
  IdPlayerTypes: PlayerIdType;
  InnateSkills: {
    InnateSkillsItem: SkillId;
  };
  Level: string;
  ListCasualties: {};
  LobbyId: string;
  Name: string;
  Number: string;
  TeamId: string;
  Value: string;
};
