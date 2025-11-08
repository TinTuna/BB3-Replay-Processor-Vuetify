<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12" lg="8" order="2" order-lg="1">
        <v-expansion-panels
          variant="accordion"
          v-model="matchPanels"
          class="match-log-panels"
        >
          <v-expansion-panel
            v-for="logEntry in dataStore.matchData?.matchLog"
            :key="`${logEntry.turn}-${logEntry.team}`"
            :id="`turn-${logEntry.turn}-${logEntry.team}`"
            class="turn-panel"
          >
            <v-expansion-panel-title
              class="turn-header"
              :class="
                logEntry.team === '0'
                  ? 'home-team home-stripe'
                  : 'away-team away-stripe'
              "
            >
              <div class="d-flex align-center flex-grow-1">
                <v-avatar
                  size="40"
                  class="mr-3"
                  :color="
                    logEntry.team === '0'
                      ? homeTeamColours.primary
                      : awayTeamColours.primary
                  "
                >
                  <v-img
                    :src="
                      logEntry.team === '0'
                        ? homeTeamLogo.logo
                        : awayTeamLogo.logo
                    "
                  />
                </v-avatar>
                <div class="d-flex flex-column flex-grow-1">
                  <div class="text-subtitle-1 font-weight-medium">
                    Turn {{ logEntry.turn }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ dataStore.getTeamName(logEntry.team) }}
                  </div>
                </div>
                <TurnEventBadges :log-entry="logEntry" />
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text
              class="turn-content"
              :style="`background-color:${
                logEntry.team === '0' ? '#F5F5F5' : '#F0F8FF'
              }; border-left: 4px solid ${
                logEntry.team === '0'
                  ? homeTeamColours.primary
                  : awayTeamColours.primary
              };`"
            >
              <Turn
                v-if="logEntry.turnActions.length"
                :log-entry-prop="logEntry"
              />
              <PitchVisualization
                :key="`pitch-${logEntry.turn}-${logEntry.team}`"
                :turn="logEntry.turn"
                :team="logEntry.team"
                :player-id="
                  openPlayerId === `${logEntry.turn}-${logEntry.team}`
                    ? selectedPlayerId
                    : undefined
                "
                :selected-action="
                  openPlayerId === `${logEntry.turn}-${logEntry.team}`
                    ? selectedAction
                    : undefined
                "
                :is-panel-open="
                  matchPanels !== undefined &&
                  matchPanels ===
                    dataStore.matchData?.matchLog.findIndex(
                      (entry) =>
                        entry.turn === logEntry.turn &&
                        entry.team === logEntry.team
                    )
                "
              />
              <v-card
                v-if="!logEntry.turnActions.length"
                variant="outlined"
                class="mt-4"
              >
                <v-card-text class="text-center py-8">
                  <v-img
                    :src="waiting"
                    max-width="150"
                    class="mx-auto mb-4"
                    cover
                  />
                  <div class="text-body-1 text-medium-emphasis">
                    Looks like a pretty quiet turn...
                  </div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" lg="4" order="1" order-lg="2">
        <v-card class="sticky-timeline" elevation="0">
          <v-card-text class="pa-0">
            <MatchTimeline :drilldown="handleDrilldown" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import Turn from "./Turn.vue";
import MatchTimeline, { Event } from "./MatchTimeline.vue";
import TurnEventBadges from "./TurnEventBadges.vue";
import PitchVisualization from "./PitchVisualization.vue";
import { TurnAction } from "@/types/Match/TurnAction";
import { ref, computed, provide } from "vue";

const dataStore = useDataStore();

const matchPanels = ref<number>();

const selectedPlayerId = ref<string | undefined>(undefined);
const openPlayerId = ref<string | undefined>(undefined);
const selectedAction = ref<TurnAction | undefined>(undefined);

const openPitchVisualization = (
  turn: number,
  team: "0" | "1",
  playerId?: string,
  action?: TurnAction
) => {
  // Find the panel index for this turn
  const panelIndex = dataStore.matchData?.matchLog.findIndex(
    (entry) => entry.turn === turn && entry.team === team
  );
  if (panelIndex !== undefined && panelIndex !== -1) {
    matchPanels.value = panelIndex;
    if (playerId) {
      selectedPlayerId.value = playerId;
      openPlayerId.value = `${turn}-${team}`;
    }
    selectedAction.value = action;
  }
};

// Provide function for child components
provide("openPitchVisualization", openPitchVisualization);

const handleDrilldown = (event: Event) => {
  if (event.drilldown?.turn) {
    const thisLogEntry =
      dataStore.matchData?.matchLog[(event.drilldown?.turn - 1) * 2].team ===
      event.drilldown?.team;
    matchPanels.value =
      (event.drilldown?.turn - 1) * 2 + (thisLogEntry ? 0 : 1);
  }
  const el = document.getElementById(
    `turn-${event.drilldown?.turn}-${event.drilldown?.team}`
  );
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }
};

const homeTeamColours = computed(() => {
  return dataStore.getTeamColours("0");
});

const awayTeamColours = computed(() => {
  return dataStore.getTeamColours("1");
});

const homeColoursPrimary = computed(() => {
  return homeTeamColours.value.primary;
});

const homeColoursSecondary = computed(() => {
  return homeTeamColours.value.secondary;
});

const homeColoursTertiary = computed(() => {
  return homeTeamColours.value.tertiary;
});

const awayColoursPrimary = computed(() => {
  return awayTeamColours.value.primary;
});

const awayColoursSecondary = computed(() => {
  return awayTeamColours.value.secondary;
});

const awayColoursTertiary = computed(() => {
  return awayTeamColours.value.tertiary;
});

const homeTeamLogo = computed(() => {
  return dataStore.getTeamLogo("0");
});

const awayTeamLogo = computed(() => {
  return dataStore.getTeamLogo("1");
});

const waiting = new URL("/waiting.jpg", import.meta.url).href;
</script>

<style scoped lang="scss">
.match-log-panels {
  .turn-panel {
    margin-bottom: 8px;
  }

  .turn-header {
    min-height: 72px;
    padding: 12px 16px;
  }

  .home-stripe {
    background-image: linear-gradient(
        135deg,
        #ffffff00 2%,
        v-bind("homeColoursPrimary") 2%,
        v-bind("homeColoursPrimary") 7%,
        #ffffff00 7%
      ),
      linear-gradient(
        135deg,
        #ffffff00 1%,
        v-bind("homeColoursSecondary") 1%,
        v-bind("homeColoursSecondary") 2%,
        #ffffff00 2%
      ),
      linear-gradient(
        135deg,
        #ffffff00 7%,
        v-bind("homeColoursTertiary") 7%,
        v-bind("homeColoursTertiary") 8%,
        #ffffff00 8%
      );
    background-size: 100%, 100%, 100%;
    background-repeat: no-repeat, no-repeat, no-repeat;
  }

  .away-stripe {
    background-image: linear-gradient(
        135deg,
        #ffffff00 2%,
        v-bind("awayColoursPrimary") 2%,
        v-bind("awayColoursPrimary") 7%,
        #ffffff00 7%
      ),
      linear-gradient(
        135deg,
        #ffffff00 1%,
        v-bind("awayColoursSecondary") 1%,
        v-bind("awayColoursSecondary") 2%,
        #ffffff00 2%
      ),
      linear-gradient(
        135deg,
        #ffffff00 7%,
        v-bind("awayColoursTertiary") 7%,
        v-bind("awayColoursTertiary") 8%,
        #ffffff00 8%
      );
    background-size: 100%, 100%, 100%;
    background-repeat: no-repeat, no-repeat, no-repeat;
  }

  .turn-content {
    padding: 16px;
  }
}
</style>
