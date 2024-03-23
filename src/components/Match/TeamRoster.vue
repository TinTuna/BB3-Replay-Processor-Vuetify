<template>
  <v-container>
    <h2>
      {{
        dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[team].Roster
          .Name
      }}
    </h2>
    <h4 class="ma-1">
      {{ teamRace }}
    </h4>
    <h4 class="ma-1">
      {{ dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[team].Name }}
    </h4>
    <v-spacer class="my-3" thickness="2" />
    <v-sheet border rounded>
      <v-data-table density="comfortable" :items="teamRoster" :headers="[
        { title: 'Number', key: 'number', align: 'center' },
        { title: 'Name', key: 'name', align: 'center' },
        { title: 'Position', key: 'position', align: 'center' },
        { title: 'MVP', key: 'mvp', align: 'center' },
      ]" items-per-page="16">
        <template #bottom></template>
      </v-data-table>
    </v-sheet>
  </v-container>
</template>


<script lang="ts" setup>
import { computed, ref } from "vue";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import { Roster } from "@/types/BaseTags/Roster";
import { EndGame } from "@/types/BaseTags/EndGame";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { getIdTeamRace } from "@/composables/stringFromIdFunctions/getIdTeamRace";
import { useDataStore } from "@/store/dataStore";
import { Player } from "@/types/Teams/Player";
import { PlayerResult } from "@/types/Results/PlayerResult";

const props = defineProps({
  team: { type: String, required: true }
});

const dataStore = useDataStore();

const team = ref(parseInt(props.team));
const roster = ref<Roster>(dataStore.rosters?.TeamRoster[team.value] as Roster);

const mvp = computed(() => {
  return dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[team.value].TeamResult.PlayerResults.PlayerResult.filter(
    (player: PlayerResult) => player.Mvp
  )[0];
});

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
      mvp: mvp.value?.PlayerData.Id && mvp.value?.PlayerData.Id === player.Id ? "MVP" : "",
    };
  });
});
</script>

<style scoped></style>