import { PlayerId } from "../IdTypes/PlayerId";
import { SkillId } from "../IdTypes/SkillId";

export type ResultSkillUsage = {
  PlayerId: PlayerId;
  Skill: SkillId;
  Used: "0" |"1";
};