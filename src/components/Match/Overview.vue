<template>
  <v-container>
    <v-card elevation="0">
      <v-card-title class="mt-2">
        <!-- Title of the competition -->
        <h2>{{ title }}</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <TeamRoster
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
            <TeamRoster
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
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { Rosters } from "@/types/BaseTags/Roster";
import { EndGame } from "@/types/BaseTags/EndGame";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import TeamRoster from "@/components/Match/TeamRoster.vue";

const props = defineProps({
  notificationGameJoined: { type: Object, required: true },
  rosters: { type: Object, required: true },
  endGame: { type: Object, required: true }
});

const title = ref<string>(
  props.notificationGameJoined.GameInfos.Competition.CompetitionInfos.Name
);

const notificationGameJoined = ref<NotificationGameJoined>(
  props.notificationGameJoined as NotificationGameJoined
);
const rosters = ref<Rosters>(props.rosters as Rosters);
const endGame = ref<EndGame>(props.endGame as EndGame);

</script>
  
<style scoped>
</style>@/composables/initialisationHelperFns/elementToJson