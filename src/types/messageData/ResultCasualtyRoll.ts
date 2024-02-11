import { PlayerId } from "../IdTypes/PlayerId";
import { RollType } from "../IdTypes/RollTypes";
import { SkillId } from "../IdTypes/SkillId";
import { Die } from "../Pitch/Die";

export type ResultCasualtyRoll = {
  status: string;
  modifiers: {
    modifier: {
      playerId: PlayerId;
      skill: SkillId;
      effect: string;
      value: string;
      modifierType: string;
    }[];
  };
  dice: {
    die: Die[];
  };
  source: string;
  rollType: RollType;
  outcome: string;
};