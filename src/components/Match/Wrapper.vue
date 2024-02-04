<template>
  <v-container class="fill-height pt-0">
    <v-responsive class="d-flex text-center fill-height">
      <v-card>
        <v-tabs v-model="tab" bg-color="primary">
          <v-tab value="overview">Overview</v-tab>
          <v-tab value="match">Match Events</v-tab>
          <v-tab value="teamstats">Team Stats</v-tab>
          <v-tab value="playerstats">Player Stats</v-tab>
          <v-tab value="dicestats">Dice Stats</v-tab>
        </v-tabs>

        <v-card-text class="pa-0 ma-0">
          <v-window v-model="tab">
            <v-window-item value="overview">
              <Overview :notification-game-joined="notificationGameJoined" :rosters="rosters" :end-game="endGame" />
            </v-window-item>
            <!-- Match -->
            <v-window-item value="match">
              <v-container>
                Currently Unavailable
              </v-container>
            </v-window-item>
            <!-- Team Stats -->
            <v-window-item value="teamstats">
              <TeamStatsWrapper :notification-game-joined="notificationGameJoined" :rosters="rosters"
                :end-game="endGame" />
            </v-window-item>
            <!-- Player Stats -->
            <v-window-item value="playerstats">
              <PlayerStatsWrapper :notification-game-joined="notificationGameJoined" :rosters="rosters"
                :end-game="endGame" />
            </v-window-item>
            <!-- Dice Stats -->
            <v-window-item value="dicestats">
              <v-container>
                Currently Unavailable
              </v-container>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { elementToJson } from "@/composables/helperFns/elementToJson";
import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { Rosters } from "@/types/BaseTags/Roster";
import { EndGame } from "@/types/BaseTags/EndGame";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import Overview from "@/components/Match/Overview.vue";
import TeamStatsWrapper from "@/components/Match/TeamStats/TeamStatsWrapper.vue";
import PlayerStatsWrapper from "@/components/Match/PlayerStats/PlayerStatsWrapper.vue";
import { processReplaySteps } from "@/composables/matchProcessingFunctions/processReplaySteps";
import { useDataStore } from "@/store/dataStore";

const dataStore = useDataStore();

const tab = ref<string>("overview");

const props = defineProps({
  processedReplay: { type: Document, required: true },
});

const processedReplay = ref<Document>(props.processedReplay);

const NotificationGameJoinedElement =
  processedReplay.value.getElementsByTagName("NotificationGameJoined");
const notificationGameJoined = elementToJson(
  NotificationGameJoinedElement[0]
) as NotificationGameJoined;

const rostersElement = processedReplay.value.getElementsByTagName("Rosters");
const rosters = elementToJson(rostersElement[0]) as Rosters;

const endGameElement = processedReplay.value.getElementsByTagName("EndGame");
const endGame = elementToJson(endGameElement[0]) as EndGame;

const replayStepsElements =
  processedReplay.value.getElementsByTagName("ReplayStep");
const replaySteps = ref<ReplayStep[]>([]);

for (let i = 0; i < replayStepsElements.length; i++) {
  replaySteps.value.push(
    elementToJson(replayStepsElements[i]) as ReplayStep
  );
}

dataStore.matchData = processReplaySteps(replaySteps.value as ReplayStep[])

</script>
  
<style scoped></style>@/composables/initialisationHelperFns/elementToJson