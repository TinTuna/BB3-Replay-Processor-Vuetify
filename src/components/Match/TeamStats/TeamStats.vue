<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 mb-3">Team Roster</h2>
        <v-sheet border rounded elevation="1">
          <v-data-table
            density="comfortable"
            :items="teamRoster"
            :headers="rosterHeaders"
            items-per-page="16"
            @click:row="handleClick"
          >
            <template #bottom></template>
          </v-data-table>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { useDataStore } from "@/store/dataStore";
import { PlayerResult } from "@/types/Results/PlayerResult";

const dataStore = useDataStore();

const props = defineProps({
  team: { type: String, required: true },
});

const team = ref<number>(parseInt(props.team));

const roster = computed(() => {
  return dataStore.rosters?.TeamRoster[team.value];
});

const mvp = computed(() => {
  return dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[
    team.value
  ]?.TeamResult?.PlayerResults?.PlayerResult?.filter(
    (player: PlayerResult) => player.Mvp
  )?.[0];
});

const rosterHeaders = [
  { title: "Number", key: "number", align: "center" as const },
  { title: "Name", key: "name", align: "center" as const },
  { title: "Position", key: "position", align: "center" as const },
  { title: "MA", key: "ma", align: "center" as const },
  { title: "ST", key: "st", align: "center" as const },
  { title: "AG", key: "ag", align: "center" as const },
  { title: "PA", key: "pa", align: "center" as const },
  { title: "AV", key: "av", align: "center" as const },
  { title: "Level", key: "level", align: "center" as const },
  { title: "SPP", key: "spp", align: "center" as const },
  { title: "Value", key: "value", align: "center" as const },
  { title: "MVP", key: "mvp", align: "center" as const },
];

const teamRoster = computed(() => {
  if (!roster.value?.Players?.PlayerData) return [];

  return roster.value.Players.PlayerData.map((player) => {
    // const endGamePlayerStats
    let pa = player.Characteristics.PlayerCharacteristic.find(
      (charac) => charac.Characteristic === "3"
    )?.Value;
    if (!pa) {
      pa = "-";
    } else {
      pa = `${pa}+`;
    }
    return {
      number: player.Number,
      name: player.Name,
      position: getIdPlayerType(player.IdPlayerTypes),
      ma: player.Characteristics.PlayerCharacteristic.find(
        (charac) => charac.Characteristic === "0"
      )?.Value,
      st: player.Characteristics.PlayerCharacteristic.find(
        (charac) => charac.Characteristic === "1"
      )?.Value,
      ag: `${
        player.Characteristics.PlayerCharacteristic.find(
          (charac) => charac.Characteristic === "2"
        )?.Value
      }+`,
      pa,
      av: `${
        player.Characteristics.PlayerCharacteristic.find(
          (charac) => charac.Characteristic === "4"
        )?.Value
      }+`,
      level: player.Level,
      spp: player.Experience,
      value: `${parseInt(player.Value).toLocaleString()}gp`,
      mvp: mvp.value?.PlayerData.Id === player.Id ? "MVP" : "",
    };
  });
});

const handleClick = () => {
  // TODO: Navigate to player stats page
  // Implementation pending
};
</script>

<style scoped></style>
