// Utilities
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { EndGame } from "@/types/BaseTags/EndGame";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import { Roster, Rosters } from "@/types/BaseTags/Roster";
import { PlayerIdType } from "@/types/IdTypes/PlayerIdTypes";
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
    rosters.value?.TeamRoster.forEach(
      (roster) => {
        // Process the players for this team
        for (const player of roster.Players.PlayerData) {
          playerData.value[player.Id] = player;
        }
      }
    );
  };

  // getters
  const getPlayerName = (playerId: string) => {
    // console.log(playerId, playerData.value, playerData.value[playerId]);
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
  const getPlayerType = (playerTypeId: PlayerIdType) => {
    return getIdPlayerType(playerTypeId);
  }

  return {
    notificationGameJoined,
    rosters,
    endGame,
    setTeamData,
    matchData,
    getPlayerName,
    getPlayerData,
    getTeamName,
    getTeamData,
    getPlayerType
  };
});
