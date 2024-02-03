import { SkillsItemType } from "../IdTypes/SkillsItemTypes";
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
        InnateSkillsItem: SkillsItemType[];
      };
      Level: string;
      Name: string;
      Value: string;
    };
    Type: string;
  };
};
