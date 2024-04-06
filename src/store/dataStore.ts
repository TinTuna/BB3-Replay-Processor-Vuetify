// Utilities
import { getColourFromGuid } from "@/composables/stringFromIdFunctions/getColourFromGuid";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { LogoGuids, getLogoFromGuid } from "@/composables/stringFromIdFunctions/getLogoFromGuid";
import { getSkillDataFromId } from "@/composables/stringFromIdFunctions/getSkillData";
import { EndGame } from "@/types/BaseTags/EndGame";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import { Roster, Rosters } from "@/types/BaseTags/Roster";
import { PlayerIdType } from "@/types/IdTypes/PlayerIdTypes";
import { SkillId } from "@/types/IdTypes/SkillId";
import { MatchData } from "@/types/MatchData";
import { Player } from "@/types/Teams/Player";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataStore = defineStore("data", () => {
  const notificationGameJoined = ref<NotificationGameJoined>();
  const rosters = ref<Rosters>();
  const endGame = ref<EndGame>();

  const teamData = ref<{ [key: string]: Roster }>({});
  const playerData = ref<{ [key: string]: Player }>({});
  const competitionData = ref<{ [key: string]: string }>({});

  const matchData = ref<MatchData | null>(null);

  // setters
  const setTeamData = () => {
    // We have to process the teams and players separately because initially the players are missing Ids and later the teams are missing key data
    notificationGameJoined.value?.GameInfos.GamersInfos.GamerInfos.forEach(
      (roster, i) => {
        teamData.value[`${i}`] = roster.Roster;
      }
    );
    // Add the overall team statistics to the team data
    teamData.value["0"].TeamStatistics = endGame.value?.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[0].TeamResult.Statistics;
    teamData.value["1"].TeamStatistics = endGame.value?.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[1].TeamResult.Statistics;

    // base64 decode the colours in the team data
    teamData.value["0"].Customization.PrimaryColor = atob(teamData.value["0"].Customization.PrimaryColor);
    teamData.value["0"].Customization.SecondaryColor = atob(teamData.value["0"].Customization.SecondaryColor);
    teamData.value["0"].Customization.TertiaryColor = atob(teamData.value["0"].Customization.TertiaryColor);

    teamData.value["1"].Customization.PrimaryColor = atob(teamData.value["1"].Customization.PrimaryColor);
    teamData.value["1"].Customization.SecondaryColor = atob(teamData.value["1"].Customization.SecondaryColor);
    teamData.value["1"].Customization.TertiaryColor = atob(teamData.value["1"].Customization.TertiaryColor);

    // Add the competition logo to the competition data
    competitionData.value.CompetitionLogo = notificationGameJoined.value?.GameInfos.Competition.CompetitionInfos.Logo as LogoGuids;


    // Now we need to process the players
    rosters.value?.TeamRoster.forEach(
      (roster) => {
        // Process the players for this team
        for (const player of roster.Players.PlayerData) {
          playerData.value[player.Id] = player;
        }
      }
    );
    // Then from the MatchData we need to grab any Inducement Players / Star Players that have been purchased
    if (matchData.value) {
      matchData.value.inducements.homeTeam.mercenaryPlayers?.forEach(
        (player) => {
          playerData.value[player.Id] = player;
          rosters.value?.TeamRoster?.[0].Players.PlayerData.push(player);
        }
      );
      matchData.value.inducements.homeTeam.starPlayers?.forEach(
        (player) => {
          playerData.value[player.Id] = player;
          rosters.value?.TeamRoster?.[0].Players.PlayerData.push(player);
        }
      );
      matchData.value.inducements.awayTeam.mercenaryPlayers?.forEach(
        (player) => {
          playerData.value[player.Id] = player;
          rosters.value?.TeamRoster?.[1].Players.PlayerData.push(player);
        }
      );
      matchData.value.inducements.awayTeam.starPlayers?.forEach(
        (player) => {
          playerData.value[player.Id] = player;
          rosters.value?.TeamRoster?.[1].Players.PlayerData.push(player);
        }
      );
    }
  };

  // getters
  const getPlayerName = (playerId: string) => {
    return playerData.value[playerId]?.Name || "Unknown Name";
  };
  const getPlayerData = (playerId: string) => {
    return playerData.value[playerId] || {};
  };
  const getTeamName = (teamId: string) => {
    return teamData.value[teamId]?.Name || "Unknown";
  };
  const getTeamData = (teamId: string) => {
    return teamData.value[teamId] || {};
  };
  const getTeamColours = (teamId: string) => {
    const colours = {
      primary: getColourFromGuid(teamData.value[teamId]?.Customization.PrimaryColor),
      secondary: getColourFromGuid(teamData.value[teamId]?.Customization.SecondaryColor),
      tertiary: getColourFromGuid(teamData.value[teamId]?.Customization.TertiaryColor),
      clash: ''
    }
    // If this is the away team, check that their colours dont clash with home team
    if (teamId === "1") {
      // Check if it clashes with the primary colour
      if (teamData.value["0"]?.Customization.PrimaryColor !== teamData.value["1"]?.Customization.PrimaryColor) {
        // If it doesn't clash, return colours
        return colours;
      }
      // Check if it also clashes with the secondary colour
      else if (teamData.value["0"]?.Customization.PrimaryColor !== teamData.value["1"]?.Customization.SecondaryColor) {
        colours.clash = colours.secondary;
      }
      // Check if it also clashes with the tertiary colour
      else if (teamData.value["0"]?.Customization.PrimaryColor !== teamData.value["1"]?.Customization.TertiaryColor) {
        colours.clash = getColourFromGuid(teamData.value["1"]?.Customization.TertiaryColor);
      }
      // If all colours clash, return a default colour
      else {
        colours.clash = getColourFromGuid('');
      }
    }
    
    return colours;
  }
  const getPlayerType = (playerTypeId: PlayerIdType) => {
    return getIdPlayerType(playerTypeId);
  }
  const getSkillData = (skillId: SkillId) => {
    return getSkillDataFromId(skillId);
  }
  const getTeamDataByDataId = (teamId: "0" | "1", teamDataId: string) => {
    return teamData.value?.[teamId]?.TeamStatistics?.AggregatedStatistics?.AggregatedStatistics?.find(
      (stat) => {
        return stat.StatId === teamDataId
      }
    )?.Value || "0"
  }
  const getTeamLogo = (teamId: string) => {
    return getLogoFromGuid(getTeamData(teamId).Team.IdRace, teamData.value[teamId]?.Customization.Logo as LogoGuids);
  }

  const getCompetitionLogo = () => {
    return getLogoFromGuid("1", competitionData.value.CompetitionLogo as LogoGuids);
  }

  return {
    notificationGameJoined,
    rosters,
    endGame,
    setTeamData,
    matchData,
    teamData,
    getPlayerName,
    getPlayerData,
    getTeamName,
    getTeamData,
    getPlayerType,
    getSkillData,
    getTeamDataByDataId,
    getTeamColours,
    getTeamLogo,
    getCompetitionLogo
  };
});
