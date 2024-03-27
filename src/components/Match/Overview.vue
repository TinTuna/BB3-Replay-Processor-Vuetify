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
            <TeamRoster team="0" :concede="concede === '0'" />
          </v-col>
          <v-col cols="2">
            <v-container>
              <h1>
                {{ homeTeamScore }}
                -
                {{ awayTeamScore }}
              </h1>
            </v-container>
            <v-divider class="my-5"></v-divider>
            <v-sheet border rounded elevation="2" class="pb-2 pt-1">
              <GameBalance title="Touchdowns Scored" :home-stat="homeTeamTouchdownsScored" :away-stat="awayTeamTouchdownsScored" />
              <GameBalance title="Possession" :home-stat="homePossession" :away-stat="awayPossession" type="percentage" />
              <GameBalance title="Blocks Made" :home-stat="homeBlocksMade" :away-stat="awayBlocksMade" />
              <GameBalance title="Injuries Inflicted" :home-stat="homeInjuriesInflicted" :away-stat="awayInjuriesInflicted" />
              <GameBalance title="Casualties Inflicted" :home-stat="homeCasualtiesInflicted" :away-stat="awayCasualtiesInflicted" />
              <GameBalance title="Kills Inflicted" :home-stat="homeKillsInflicted" :away-stat="awayKillsInflicted" />
              <GameBalance title="Yards Run With Ball" :home-stat="homeYardsRunWithBall" :away-stat="awayYardsRunWithBall" />
              <!-- <GameBalance title="Passes Completed" home-stat="0" away-stat="0" />
              <GameBalance title="Fouls Comitted" home-stat="0" away-stat="0" /> -->
            </v-sheet>
          </v-col>
          <v-col cols="5">
            <TeamRoster team="1" :concede="concede === '1'" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import TeamRoster from "@/components/Match/TeamRoster.vue";
import GameBalance from "@/components/Match/GameBalance.vue";
import { useDataStore } from "@/store/dataStore";
import { computed } from "vue";

const dataStore = useDataStore();

const title = ref<string | undefined>(
  dataStore.notificationGameJoined?.GameInfos.Competition.CompetitionInfos.Name
);

const concede = computed(() => {
  if(dataStore.endGame?.RulesEventGameFinished.MatchResult.CompletionStatus === "1") {
    // If this is true, we know one of the teams has conceded
    // We get the data on who conceded from the MatchResult
    return dataStore.matchData?.conceded
  }
  return undefined
})

const homeTeamTouchdownsScored = computed(() => {
  return dataStore.getTeamDataByDataId("0", "18")
})
const awayTeamTouchdownsScored = computed(() => {
  return dataStore.getTeamDataByDataId("1", "18")
})

const homeTeamScore = computed(() => {
  let points = 0
  if(concede.value === "1") {
    points += 1
  }
  if(!homeTeamTouchdownsScored.value) return points.toString()
  return (parseInt(homeTeamTouchdownsScored.value) + points).toString()
})
const awayTeamScore = computed(() => {
  let points = 0
  if(concede.value === "0") {
    points += 1
  }
  if(!awayTeamTouchdownsScored.value) return points.toString()
  return (parseInt(awayTeamTouchdownsScored.value) + points).toString()
})

const homeYardsRunWithBall = computed(() => {
  return dataStore.getTeamDataByDataId("0", "23")
})
const awayYardsRunWithBall = computed(() => {
  return dataStore.getTeamDataByDataId("1", "23")
})

const homeBlocksMade = computed(() => {
  return dataStore.getTeamDataByDataId("0", "26")
})
const awayBlocksMade = computed(() => {
  return dataStore.getTeamDataByDataId("1", "26")
})

const homeCasualtiesInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("0", "19")
})
const awayCasualtiesInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("1", "19")
})

const homeInjuriesInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("0", "22")
})
const awayInjuriesInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("1", "22")
})

const homeKillsInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("0", "21")
})
const awayKillsInflicted = computed(() => {
  return dataStore.getTeamDataByDataId("1", "21")
})

const homePossession = computed(() => {
  return dataStore.matchData?.ballPossession.homeTeam.toString() || "0"
})
const awayPossession = computed(() => {
  return dataStore.matchData?.ballPossession.awayTeam.toString() || "0"
})

</script>

<style scoped></style>