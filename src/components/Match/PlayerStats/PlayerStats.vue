<template>
  <v-container>
    <v-select v-model="selectedPlayer" :items="listPlayers" item-title="name" item-value="id" label="Player" outlined
      dense return-object>
    </v-select>

    <!-- Statline -->
    <div>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>{{ playerName }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-card>stat</v-card>
                </v-col>
                <v-col cols="6">
                  <v-card>stat</v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-card>stat</v-card>
                </v-col>
                <v-col cols="6">
                  <v-card>stat</v-card>
                </v-col>
              </v-row>

            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Skills</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <v-card>skill</v-card>
                </v-col>
                <v-col cols="3">
                  <v-card>skill</v-card>
                </v-col>
                <v-col cols="3">
                  <v-card>skill</v-card>
                </v-col>
                <v-col cols="3">
                  <v-card>skill</v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table :items="playerStats" :headers="headers" items-per-page="15"></v-data-table>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>
      
      
<script lang="ts" setup>
import { computed, ref } from "vue";
import { Roster } from "@/types/BaseTags/Roster";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { useDataStore } from "@/store/dataStore";
import { VDataTable } from "vuetify/lib/components/index.mjs";

const dataStore = useDataStore();

const props = defineProps({
  team: { type: String, required: true }
});

const team = ref<number>(parseInt(props.team));

const roster = ref<Roster>(dataStore.rosters?.TeamRoster[team.value] as Roster);

const listPlayers = computed(() => {
  return roster.value.Players.PlayerData.map((player) => {
    return {
      id: player.Id,
      name: `${player.Name} - ${getIdPlayerType(player.IdPlayerTypes)}`
    };
  });
});

const selectedPlayer = ref(listPlayers.value[0]);

const playerMatchData = computed(() => {
  return dataStore.matchData?.playerData?.[selectedPlayer.value.id];
});
const playerName = computed(() => {
  return dataStore.getPlayerName(selectedPlayer.value.id);
});

const playerStats = computed(() => {
  const stats = [];
  if (playerMatchData.value) {
    for (const [key, value] of Object.entries(playerMatchData.value)) {
      // check if value is an object with sub-values
      if (typeof value === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          stats.push({
            stat: `${key} ${subKey}`,
            value: subValue,
          });
        }
      } else {
        stats.push({
          stat: key,
          value: value,
        });
      }
      
    }
  }
  return stats;
});

const headers = [
  { title: "Stat", value: "stat", align: "center", width: "50%"},
  { title: "Value", value: "value", align: "center", width: "50%"},
] as unknown as any[];

</script>
        
<style scoped></style>