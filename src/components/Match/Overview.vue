<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <TeamRoster team="0" :concede="concede === '0'" />
      </v-col>
      <v-col cols="2">
        <v-card
          class="py-2"
          elevation="2"
          color="blue-grey-lighten-5 d-flex flex-column justify-center align-center"
        >
          <div class="logo">
            <v-img :src="competitionLogo.logo" />
          </div>
          <h1 class="text-h5">{{ title }}</h1>
          <v-divider></v-divider>
          <v-container>
            <h1>
              {{ homeTeamScore }}
              -
              {{ awayTeamScore }}
            </h1>
          </v-container>
        </v-card>
        <v-divider class="my-5"></v-divider>
        <v-sheet
          border
          rounded
          elevation="2"
          class="pb-2 pt-1"
          color="blue-grey-lighten-5"
        >
          <GameBalance
            title="Touchdowns Scored"
            :home-stat="homeTeamTouchdownsScored"
            :away-stat="awayTeamTouchdownsScored"
          />
          <GameBalance
            title="Possession"
            :home-stat="homePossession"
            :away-stat="awayPossession"
            type="percentage"
          />
          <GameBalance
            title="Blocks Made"
            :home-stat="homeBlocksMade"
            :away-stat="awayBlocksMade"
          />
          <GameBalance
            title="KOs Inflicted"
            :home-stat="homeKOsInflicted"
            :away-stat="awayKOsInflicted"
          />
          <GameBalance
            title="Injuries Inflicted"
            :home-stat="homeInjuriesInflicted"
            :away-stat="awayInjuriesInflicted"
          />
          <GameBalance
            title="Deaths Inflicted"
            :home-stat="homeDeathsInflicted"
            :away-stat="awayDeathsInflicted"
          />
          <GameBalance
            title="Yards Run With Ball"
            :home-stat="homeYardsRunWithBall"
            :away-stat="awayYardsRunWithBall"
          />
          <!-- <GameBalance title="Passes Completed" home-stat="0" away-stat="0" />
              <GameBalance title="Fouls Comitted" home-stat="0" away-stat="0" /> -->
        </v-sheet>
        <!-- <v-divider class="my-5"></v-divider>
        <v-sheet border rounded elevation="2" class="pb-2 pt-1" color="blue-grey-lighten-5">
          Nuffle-y things
        </v-sheet> -->
      </v-col>
      <v-col cols="5">
        <TeamRoster team="1" :concede="concede === '1'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import TeamRoster from "@/components/Match/TeamRoster.vue";
import GameBalance from "@/components/Match/GameBalance.vue";
import { useDataStore } from "@/store/dataStore";

const dataStore = useDataStore();

const title = ref<string | undefined>(
  dataStore.notificationGameJoined?.GameInfos.Competition.CompetitionInfos.Name
);

const concede = computed(() => {
  if (
    dataStore.endGame?.RulesEventGameFinished.MatchResult.CompletionStatus ===
    "1"
  ) {
    // If this is true, we know one of the teams has conceded
    // We get the data on who conceded from the MatchResult
    return dataStore.matchData?.conceded;
  }
  return undefined;
});

const competitionLogo = computed(() => {
  return dataStore.getCompetitionLogo();
});

const homeTeamTouchdownsScored = computed(() => {
  return (
    dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults
      .GamerResult[0].TeamResult.TouchdownsBeforeConcede || "0"
  );
});
const awayTeamTouchdownsScored = computed(() => {
  return (
    dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults
      .GamerResult[1].TeamResult.TouchdownsBeforeConcede || "0"
  );
});

const homeTeamScore = computed(() => {
  let points = 0;
  if (concede.value === "1") {
    points += 1;
  }
  if (!homeTeamTouchdownsScored.value) return points.toString();
  return (parseInt(homeTeamTouchdownsScored.value) + points).toString();
});
const awayTeamScore = computed(() => {
  let points = 0;
  if (concede.value === "0") {
    points += 1;
  }
  if (!awayTeamTouchdownsScored.value) return points.toString();
  return (parseInt(awayTeamTouchdownsScored.value) + points).toString();
});

const homeYardsRunWithBall = computed(() => {
  return dataStore.getTeamDataByDataId("0", "23");
});
const awayYardsRunWithBall = computed(() => {
  return dataStore.getTeamDataByDataId("1", "23");
});

const homeBlocksMade = computed(() => {
  return dataStore.getTeamDataByDataId("0", "26");
});
const awayBlocksMade = computed(() => {
  return dataStore.getTeamDataByDataId("1", "26");
});

const homeKOsInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("0", "25");
});
const awayKOsInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("1", "25");
});

const homeInjuriesInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("0", "22");
});
const awayInjuriesInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("1", "22");
});

const homeDeathsInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("0", "21");
});
const awayDeathsInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("1", "21");
});

const homePossession = computed(() => {
  return dataStore.matchData?.ballPossession.homeTeam.toString() || "0";
});
const awayPossession = computed(() => {
  return dataStore.matchData?.ballPossession.awayTeam.toString() || "0";
});
</script>

<style scoped>
.logo {
  position: absolute;
  opacity: 0.1;
  height: 200px;
  width: 200px;
}
</style>
