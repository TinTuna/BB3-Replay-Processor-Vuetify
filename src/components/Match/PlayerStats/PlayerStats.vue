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
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6">
                      <v-card>
                        <v-card-text>
                          Running Yards: {{ playerData?.yardsMoved || '0' }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="6">

                      <v-card>
                        <v-card-text>
                          Running Yards (With the Ball): {{ playerData?.yardsMovedWithBall || '0' }}
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
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
    </div>

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

const dataStore = useDataStore();

const props = defineProps({
  team: { type: String, required: true },
  notificationGameJoined: { type: Object, required: true },
  rosters: { type: Object, required: true },
  endGame: { type: Object, required: true },
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

const listPlayers = computed(() => {
  return roster.value.Players.PlayerData.map((player) => {
    console.log(player.Id);
    return {
      id: player.Id,
      name: `${player.Name} - ${getIdPlayerType(player.IdPlayerTypes)}`
    };
  });
});



</script>
        
<style scoped></style>