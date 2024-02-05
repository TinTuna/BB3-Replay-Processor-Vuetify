<template>
  <v-container>
    <v-select v-model="selectedPlayer" :items="listPlayers" item-title="name" item-value="id" label="Player" outlined
      dense return-object>
    </v-select>

    <!-- Statline -->
    <div v-if="selectedPlayer.id != '0'">
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
import { computed, onMounted, ref } from "vue";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import { Roster } from "@/types/BaseTags/Roster";
import { EndGame } from "@/types/BaseTags/EndGame";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { getIdTeamRace } from "@/composables/stringFromIdFunctions/getIdTeamRace";
import { useDataStore } from "@/store/dataStore";
import { VDataTable } from "vuetify/lib/components/index.mjs";

const dataStore = useDataStore();

const props = defineProps({
  team: { type: String, required: true },
  notificationGameJoined: { type: Object, required: true },
  rosters: { type: Object, required: true },
  endGame: { type: Object, required: true },
});

const listPlayers = computed(() => {
  return roster.value.Players.PlayerData.map((player) => {
    return {
      id: player.Id,
      name: `${player.Name} - ${getIdPlayerType(player.IdPlayerTypes)}`
    };
  });
});

const team = ref<number>(parseInt(props.team));
const selectedPlayer = ref({
  id: "0",
  name: "",
} as { id: string; name: string });


const notificationGameJoined = ref<NotificationGameJoined>(
  props.notificationGameJoined as NotificationGameJoined
);
const roster = ref<Roster>(props.rosters.TeamRoster[team.value] as Roster);
const endGame = ref<EndGame>(props.endGame as EndGame);

const playerData = computed(() => {
  return dataStore.matchData?.playerData?.[selectedPlayer.value.id];
});
const playerName = computed(() => {
  return selectedPlayer.value.name;
});

const playerStats = computed(() => {
  const stats = [];
  if (playerData.value) {
    for (const [key, value] of Object.entries(playerData.value)) {
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



onMounted(() => {
  selectedPlayer.value = listPlayers.value[0];
});

</script>
        
<style scoped></style>