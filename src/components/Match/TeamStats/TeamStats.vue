<template>
  <v-container>
    <v-sheet border rounded elevation="1">
      <v-data-table density="comfortable" :items="teamRoster" :headers="headers" items-per-page="16" @click:row="handleClick">
        <template #bottom></template>
      </v-data-table>
    </v-sheet>
  </v-container>
</template>


<script lang="ts" setup>
import { computed, ref } from "vue";
import { Roster } from "@/types/BaseTags/Roster";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { useDataStore } from "@/store/dataStore";
import { PlayerResult } from "@/types/Results/PlayerResult";

const dataStore = useDataStore();

const props = defineProps({
  team: { type: String, required: true }
});

const team = ref<number>(parseInt(props.team));
const roster = ref<Roster>(dataStore.rosters?.TeamRoster[team.value] as Roster);


const mvp = computed(() => {
  return dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[team.value].TeamResult.PlayerResults.PlayerResult.filter(
    (player: PlayerResult) => player.Mvp
  )[0];
});

const headers = [
  { title: 'Number', key: 'number', align: 'center' },
  { title: 'Name', key: 'name', align: 'center' },
  { title: 'Position', key: 'position', align: 'center' },
  { title: 'MA', key: 'ma', align: 'center' },
  { title: 'ST', key: 'st', align: 'center' },
  { title: 'AG', key: 'ag', align: 'center' },
  { title: 'PA', key: 'pa', align: 'center' },
  { title: 'AV', key: 'av', align: 'center' },
  { title: 'Level', key: 'level', align: 'center' },
  { title: 'SPP', key: 'spp', align: 'center' },
  { title: 'Value', key: 'value', align: 'center' },
  { title: 'MVP', key: 'mvp', align: 'center' },
] as unknown as any[]

const teamRoster = computed(() => {
  return roster.value.Players.PlayerData.map((player) => {
    // const endGamePlayerStats
    let pa = player.Characteristics.PlayerCharacteristic.find((charac) => charac.Characteristic === "3")?.Value
    if (!pa) {
      pa = "-"
    } else {
      pa = `${pa}+`
    }
    return {
      number: player.Number,
      name: player.Name,
      position: getIdPlayerType(player.IdPlayerTypes),
      ma: player.Characteristics.PlayerCharacteristic.find((charac) => charac.Characteristic === "0")?.Value,
      st: player.Characteristics.PlayerCharacteristic.find((charac) => charac.Characteristic === "1")?.Value,
      ag: `${player.Characteristics.PlayerCharacteristic.find((charac) => charac.Characteristic === "2")?.Value}+`,
      pa,
      av: `${player.Characteristics.PlayerCharacteristic.find((charac) => charac.Characteristic === "4")?.Value}+`,
      level: player.Level,
      spp: player.Experience,
      value: parseInt(player.Value).toLocaleString(),
      mvp: mvp.value?.PlayerData.Id === player.Id ? "MVP" : "",
    };
  });
});

const handleClick = (ev: any, x: any) => {
  // grab the player number
  const number = x.internalItem.columns.number
  // go to the player stats page with the team and player number
  // TODO
}

</script>

<style scoped></style>