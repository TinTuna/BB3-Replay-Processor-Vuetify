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
            <TeamRoster team="0" />
          </v-col>
          <v-col cols="2">
            <v-container>
              <h1>
                {{
                  dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults
                    .GamerResult[0].TeamResult.TouchdownsBeforeConcede || 0
                }}
                -
                {{
                  dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults
                    .GamerResult[1].TeamResult.TouchdownsBeforeConcede || 0
                }}
              </h1>
            </v-container>
          </v-col>
          <v-col cols="5">
            <TeamRoster team="1" />
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
import { useDataStore } from "@/store/dataStore";

const dataStore = useDataStore();

const title = ref<string | undefined>(
  dataStore.notificationGameJoined?.GameInfos.Competition.CompetitionInfos.Name
);

</script>
  
<style scoped></style>@/composables/initialisationHelperFns/elementToJson