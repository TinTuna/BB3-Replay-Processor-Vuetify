import { Player } from "../Teams/Player";
import { Team } from "../Teams/Team";

export type Rosters = {
  TeamRoster: Roster[];
};

export type Roster = {
  Customization: {
    Cheerleader: string;
    CheerleaderZone: string;
    Coach: string;
    CoachZone: string;
    Dice: string;
    JerseyPattern: string;
    Logo: string;
    PrimaryColor: string;
    SecondaryColor: string;
    StaffZone: string;
    TertiaryColor: string;
  };
  Motto: string;
  Name: string;
  Players: {
    PlayerData: Player[];
  };
  Team: Team;
};
