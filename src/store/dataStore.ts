// Utilities
import { getColourFromGuid } from "@/composables/stringFromIdFunctions/getColourFromGuid";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
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
          console.log(player);
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
    return {
      primary: getColourFromGuid(teamData.value[teamId]?.Customization.PrimaryColor),
      secondary: getColourFromGuid(teamData.value[teamId]?.Customization.SecondaryColor),
      tertiary: getColourFromGuid(teamData.value[teamId]?.Customization.TertiaryColor)
    };
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
    getTeamColours
  };
});
