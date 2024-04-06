<template>
  <v-card border rounded elevation="2" class="stripe" color="blue-grey-lighten-5">
    <div class="logo">
      <v-img :src="teamLogo.logo"/>
    </div>

    <v-card-title>
      <h2 class="mt-4 flex-fill">
        {{ teamName }}
        <v-tooltip v-if="concede" text="Conceded" location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">mdi-flag-variant-outline</v-icon>
          </template>
        </v-tooltip>
      </h2>
    </v-card-title>
    <v-card-subtitle>
      <h4 class="ma-1">
        {{ teamRace }}
      </h4>
      <h4 class="ma-1">
        {{ dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[team].Name }}
      </h4>
    </v-card-subtitle>


    <v-spacer class="my-5" thickness="2" />
    <v-sheet>
      <v-data-table density="comfortable" :items="teamRoster" :headers="[
        { title: 'Number', key: 'number', align: 'center' },
        { title: 'Name', key: 'name', align: 'center' },
        { title: 'Position', key: 'position', align: 'center' },
        { title: 'MVP', key: 'mvp', align: 'center' },
      ]" items-per-page="16" style="background-color: #ECEFF1;">
        <template v-slot:[`item.position`]="{ item }">
          <span>
            <v-icon v-if="item.starPlayer" color="yellow-darken-3">mdi-star-circle</v-icon>
            <v-icon v-if="item.journeyman" color="primary">mdi-file-document-edit-outline</v-icon>
            {{ item.position }}
          </span>
        </template>
        <template #bottom></template>
      </v-data-table>
    </v-sheet>
  </v-card>
</template>


<script lang="ts" setup>
import { computed, ref } from "vue";
import { Roster } from "@/types/BaseTags/Roster";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { getIdTeamRace } from "@/composables/stringFromIdFunctions/getIdTeamRace";
import { useDataStore } from "@/store/dataStore";
import { PlayerResult } from "@/types/Results/PlayerResult";

const props = defineProps({
  team: { type: String, required: true },
  concede: { type: Boolean, required: false, default: false }
});

const dataStore = useDataStore();

const team = ref(parseInt(props.team));
const roster = ref<Roster>(dataStore.rosters?.TeamRoster[team.value] as Roster);

const teamName = computed(() => {
  return dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[team.value].Roster.Name;
});

const teamColours = computed(() => {
  return dataStore.getTeamColours(team.value.toString());
});

const teamLogo = computed(() => {
  return dataStore.getTeamLogo(team.value.toString());
});

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
      starPlayer: player.StarPlayer,
      journeyman: player.Journeyman
    };
  });
});

const teamColoursPrimary = computed(() => {
  return teamColours.value.primary;
});
const teamColoursSecondary = computed(() => {
  return teamColours.value.secondary;
});
const teamColoursTertiary = computed(() => {
  return teamColours.value.tertiary;
});
</script>

<style scoped lang="scss">
.stripe {
  background-image: linear-gradient(135deg, #ffffff00 6%, v-bind(teamColoursPrimary) 6%, v-bind(teamColoursPrimary) 11%, #ffffff00 11%),
    linear-gradient(135deg, #ffffff00 5%, v-bind(teamColoursSecondary) 5%, v-bind(teamColoursSecondary) 6%, #ffffff00 6%),
    linear-gradient(135deg, #ffffff00 11%, v-bind(teamColoursTertiary) 11%, v-bind(teamColoursTertiary) 12%, #ffffff00 12%);
  background-size: 100%, 100%, 100%;
  background-repeat: no-repeat, no-repeat, no-repeat;
  /* To avoid multiple instances */
}

.logo {
  position: absolute;
  top: 0;
  left: 20px;
  height: 125px;
  width: 125px;
  background-color: #ffffff80;
  border-radius: 50%
}
</style>