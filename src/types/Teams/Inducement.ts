import { SkillId } from "../IdTypes/SkillId";
import { PlayerIdType } from "../IdTypes/PlayerIdTypes";
import { Characteristic } from "./Characteristic";

export type Inducement = {
  Cost: string;
  Max: string;
  Players: {
    PlayerData: {
      Characteristics: {
        PlayerCharacteristic: Characteristic[];
      };
      Contract: string;
      Customization: {};
      IdPlayerTypes: PlayerIdType;
      InnateSkills: {
        InnateSkillsItem: SkillId[];
      };
      Level: string;
      Name: string;
      Value: string;
    };
    Type: string;
  };
};
