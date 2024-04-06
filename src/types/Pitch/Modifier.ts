import { PlayerId } from "../IdTypes/PlayerId";
import { SkillId } from "../IdTypes/SkillId";

export type Modifier = {
  ModifierType: string;
  Value: string;
  PlayerId: PlayerId;
  Skill: SkillId;
  Effect: string;
};