<template>
  <v-container>
    <h2>
      {{
        notificationGameJoined.GameInfos.GamersInfos.GamerInfos[team].Roster
          .Name
      }}
    </h2>
    <h4 class="ma-1">
      {{ teamRace }}
    </h4>
    <h4 class="ma-1">
      {{ notificationGameJoined.GameInfos.GamersInfos.GamerInfos[team].Name }}
    </h4>
    <v-divider class="my-3" thickness="2" />
    <v-data-table :items="teamRoster" :headers="headers" items-per-page="16">
      <template #bottom></template>
    </v-data-table>
  </v-container>
</template>
  
  
<script lang="ts" setup>
import { computed, ref } from "vue";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import { Roster } from "@/types/BaseTags/Roster";
import { EndGame } from "@/types/BaseTags/EndGame";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { getIdTeamRace } from "@/composables/stringFromIdFunctions/getIdTeamRace";

const props = defineProps({
  team: { type: String, required: true },
  notificationGameJoined: { type: Object, required: true },
  rosters: { type: Object, required: true },
  endGame: { type: Object, required: true },
});

const team = ref(parseInt(props.team));

const notificationGameJoined = ref<NotificationGameJoined>(
  props.notificationGameJoined as NotificationGameJoined
);

const roster = ref<Roster>(props.rosters.TeamRoster[team.value] as Roster);

const endGame = ref<EndGame>(props.endGame as EndGame);

const mvp = computed(() => {
  return endGame.value.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[team.value].TeamResult.PlayerResults.PlayerResult.filter(
    (player) => player.Mvp
  )[0];
});

const headers = [
  { title: "Number", key: "number", align: "center" },
  { title: "Name", key: "name", align: "center" },
  { title: "Position", key: "position", align: "center" },
  { title: "MVP", key: "mvp", align: "center" },
];

const teamRace = computed(() => {
  return getIdTeamRace(roster.value.Team.IdRace);
});

const teamRoster = computed(() => {
  return roster.value.Players.PlayerData.map((player) => {
    // const endGamePlayerStats
    return {
      number: player.Number,
      name: player.Name,
      position: getIdPlayerType(player.IdPlayerTypes),
      mvp: mvp.value?.PlayerData.Id === player.Id ? "MVP" : "",
    };
  });
});
</script>
    
<style scoped>
</style>