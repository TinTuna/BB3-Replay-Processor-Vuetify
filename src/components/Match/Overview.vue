<template>
  <v-container class="fill-height pt-0">
    <v-responsive class="d-flex text-center fill-height">
      <v-container>
        <v-card>
          <v-card-title class="mt-2">
            <!-- Title of the competition -->
            <h2>{{ title }}</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="5">
                <TeamStats
                  team="0"
                  :notificationGameJoined="notificationGameJoined"
                  :rosters="rosters"
                  :endGame="endGame"
                />
              </v-col>
              <v-col cols="2">
                <v-container>
                  <h1>
                    {{
                      endGame.RulesEventGameFinished.MatchResult.GamerResults
                        .GamerResult[0].TeamResult.TouchdownsBeforeConcede || 0
                    }}
                    -
                    {{
                      endGame.RulesEventGameFinished.MatchResult.GamerResults
                        .GamerResult[1].TeamResult.TouchdownsBeforeConcede || 0
                    }}
                  </h1>
                </v-container>
              </v-col>
              <v-col cols="5">
                <TeamStats
                  team="1"
                  :notificationGameJoined="notificationGameJoined"
                  :rosters="rosters"
                  :endGame="endGame"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
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
import TeamStats from "@/components/Match/TeamStats.vue";

const props = defineProps({
  processedReplay: { type: Document, required: true },
});

const processedReplay = ref<Document>(props.processedReplay);

const NotificationGameJoinedElement =
  processedReplay.value.getElementsByTagName("NotificationGameJoined");
const notificationGameJoined = elementToJson(
  NotificationGameJoinedElement[0]
) as NotificationGameJoined;

const title = ref<string>(
  notificationGameJoined.GameInfos.Competition.CompetitionInfos.Name
);

const rostersElement = processedReplay.value.getElementsByTagName("Rosters");
const rosters = elementToJson(rostersElement[0]) as Rosters;

const endGameElement = processedReplay.value.getElementsByTagName("EndGame");
const endGame = elementToJson(endGameElement[0]) as EndGame;

const replayStepsElements =
  processedReplay.value.getElementsByTagName("ReplayStep");
const replaySteps = ref<ReplayStep>();
for (let i = 0; i < replayStepsElements.length; i++) {
  replaySteps.value = elementToJson(replayStepsElements[i]);
}
</script>
  
<style scoped>
</style>@/composables/initialisationHelperFns/elementToJson