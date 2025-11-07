<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-row>
        <v-col cols="12">
          <div class="pitch-container">
            <div class="pitch-grid">
              <div v-for="y in 15" :key="`row-${y}`" class="pitch-row">
                <div
                  v-for="x in 26"
                  :key="`cell-${x}-${y}`"
                  class="pitch-cell"
                  :class="getCellClass(x - 1, y - 1)"
                >
                  <div
                    v-for="player in getPlayersAtPosition(x - 1, y - 1)"
                    :key="player.id"
                    class="player-marker"
                    :class="{
                      'home-player': player.team === '0',
                      'away-player': player.team === '1',
                      'selected-player': selectedPlayerId === player.id,
                    }"
                    :style="getPlayerStyle(player)"
                    @click="selectPlayer(player.id)"
                  >
                    <div class="player-number">{{ player.number }}</div>
                    <v-tooltip :text="player.name" location="top">
                      <template v-slot:activator="{ props }">
                        <div v-bind="props"></div>
                      </template>
                    </v-tooltip>
                    <div
                      v-if="
                        ballPosition &&
                        ballPosition.isHeld &&
                        ballPosition.heldBy === player.id
                      "
                      class="ball-marker ball-on-player"
                      :class="{
                        'ball-airborne': ballPosition.isAirborne,
                      }"
                    >
                      <img :src="ballImage" alt="Ball" class="ball-image" />
                    </div>
                  </div>
                  <div
                    v-if="
                      ballPosition &&
                      !ballPosition.isHeld &&
                      ballPosition.x === x - 1 &&
                      ballPosition.y === y - 1
                    "
                    class="ball-marker"
                    :class="{
                      'ball-airborne': ballPosition.isAirborne,
                    }"
                  >
                    <img :src="ballImage" alt="Ball" class="ball-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import { computed, ref, watch } from "vue";
import { Turn } from "@/types/Match/Turn";
import ballImageSrc from "@/assets/ball.webp";

const props = defineProps<{
  turn: number;
  team: "0" | "1";
  playerId?: string;
  isPanelOpen?: boolean;
}>();

defineEmits<{
  close: [];
}>();

const dataStore = useDataStore();

const selectedPlayerId = ref<string | null>(null);

type DisplayPlayer = {
  id: string;
  name: string;
  number: string;
  team: "0" | "1";
  type: string;
  x: number;
  y: number;
  actions: Array<{ label: string; value: unknown }>;
};

const displayPlayers = ref<DisplayPlayer[]>([]);
const ballPosition = ref<{
  x: number;
  y: number;
  isHeld: boolean;
  isAirborne: boolean;
  heldBy?: string;
} | null>(null);

const turnData = computed<Turn | null>(() => {
  const matchLog = dataStore.matchData?.matchLog;
  if (!matchLog) return null;

  return (
    matchLog.find(
      (entry) => entry.turn === props.turn && entry.team === props.team
    ) || null
  );
});

const homeTeamColours = computed(() => {
  return dataStore.getTeamColours("0");
});

const awayTeamColours = computed(() => {
  return dataStore.getTeamColours("1");
});

const ballImage = ballImageSrc;

const getCellClass = (x: number, y: number): string => {
  const classes: string[] = [];

  // End zones (first and last columns)
  if (x === 0 || x === 25) {
    classes.push("end-zone");
  }

  // Center line (middle of pitch)
  if (x === 12 || x === 13) {
    classes.push("center-line");
  }

  // Wide zones (first and last rows)
  if (y === 0 || y === 14) {
    classes.push("wide-zone");
  }

  return classes.join(" ");
};

const getPlayersAtPosition = (x: number, y: number): DisplayPlayer[] => {
  return displayPlayers.value.filter(
    (player) => player.x === x && player.y === y
  );
};

const getPlayerStyle = (player: DisplayPlayer) => {
  const colours =
    player.team === "0" ? homeTeamColours.value : awayTeamColours.value;
  return {
    backgroundColor: colours.primary,
    color: colours.secondary || "#ffffff",
  };
};

const selectPlayer = (playerId: string) => {
  selectedPlayerId.value =
    selectedPlayerId.value === playerId ? null : playerId;
};

const loadPitchState = () => {
  if (!turnData.value) {
    displayPlayers.value = [];
    ballPosition.value = null;
    return;
  }

  const pitchState = dataStore.getPitchState(
    turnData.value.turn,
    turnData.value.team
  );

  if (!pitchState) {
    displayPlayers.value = [];
    ballPosition.value = null;
    return;
  }

  const players: DisplayPlayer[] = [];
  const turnActions = turnData.value.turnActions || [];

  // Get all player positions from pitch state
  Object.entries(pitchState.playerPositions).forEach(([playerId, position]) => {
    const playerData = dataStore.getPlayerData(playerId);
    const playerName = dataStore.getPlayerName(playerId);

    // Determine which team this player belongs to
    // Check if player is in home team roster (team 0) or away team roster (team 1)
    const homeTeamPlayers =
      dataStore.rosters?.TeamRoster[0]?.Players?.PlayerData || [];
    const awayTeamPlayers =
      dataStore.rosters?.TeamRoster[1]?.Players?.PlayerData || [];

    const isHomeTeam = homeTeamPlayers.some((p) => p.Id === playerId);
    const isAwayTeam = awayTeamPlayers.some((p) => p.Id === playerId);

    let team: "0" | "1" = "0";
    if (isAwayTeam) {
      team = "1";
    } else if (!isHomeTeam) {
      // If not found in either, check matchData for inducements
      const matchData = dataStore.matchData;
      if (
        matchData?.inducements.awayTeam.mercenaryPlayers?.some(
          (p) => p.Id === playerId
        ) ||
        matchData?.inducements.awayTeam.starPlayers?.some(
          (p) => p.Id === playerId
        )
      ) {
        team = "1";
      }
    }

    // Find actions for this player from turn actions
    const playerActions = turnActions
      .filter((action) => action.playerId === playerId)
      .flatMap((action) => {
        const actions: Array<{ label: string; value: unknown }> = [];

        if (action.actionsTaken?.yardsMoved) {
          actions.push({
            label: `Moved ${action.actionsTaken.yardsMoved} yards`,
            value: action.actionsTaken.yardsMoved,
          });
        }
        if (action.actionsTaken?.blockAttempted) {
          actions.push({
            label: `Block: ${action.actionsTaken.blockAttempted}`,
            value: action.actionsTaken.blockAttempted,
          });
        }
        if (action.actionsTaken?.touchdownScored) {
          actions.push({
            label: "Touchdown!",
            value: true,
          });
        }
        if (action.actionsTaken?.passAttempted) {
          actions.push({
            label: `Pass: ${
              action.actionsTaken.passAttempted.passSuccess
                ? "Success"
                : "Failed"
            }`,
            value: action.actionsTaken.passAttempted,
          });
        }
        if (action.actionsTaken?.handoffAttempted) {
          actions.push({
            label: "Handoff",
            value: action.actionsTaken.handoffAttempted,
          });
        }
        if (action.actionsTaken?.catchAttempted) {
          actions.push({
            label: `Catch: ${
              action.actionsTaken.catchAttempted.catchSuccess
                ? "Success"
                : "Failed"
            }`,
            value: action.actionsTaken.catchAttempted,
          });
        }

        return actions;
      });

    players.push({
      id: playerId,
      name: playerName,
      number: playerData.Number || "00",
      team: team,
      type: playerData.IdPlayerTypes || "",
      x: parseInt(position.x),
      y: parseInt(position.y),
      actions: playerActions,
    });
  });

  displayPlayers.value = players;

  // Set ball position
  if (pitchState.ballPosition) {
    ballPosition.value = {
      x: parseInt(pitchState.ballPosition.x),
      y: parseInt(pitchState.ballPosition.y),
      isHeld: pitchState.ballPosition.isHeld,
      isAirborne: pitchState.ballPosition.isAirborne,
      heldBy: pitchState.ballPosition.heldBy,
    };
  } else {
    ballPosition.value = null;
  }
};

watch(
  () => [props.turn, props.team, props.isPanelOpen],
  () => {
    // Only load pitch state when panel is open
    if (props.isPanelOpen !== false) {
      loadPitchState();
      setTimeout(() => {
        if (
          props.playerId &&
          displayPlayers.value.some((p) => p.id === props.playerId)
        ) {
          selectedPlayerId.value = props.playerId;
        } else {
          selectedPlayerId.value = null;
        }
      }, 100);
    }
  },
  { immediate: true }
);

watch(
  () => props.playerId,
  (newPlayerId) => {
    if (newPlayerId && displayPlayers.value.some((p) => p.id === newPlayerId)) {
      selectedPlayerId.value = newPlayerId;
    }
  }
);
</script>

<style scoped lang="scss">
.pitch-container {
  width: 100%;
  overflow: auto;
  border: 2px solid #333;
  background-image: url("@/assets/pitch.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.pitch-grid {
  display: grid;
  grid-template-columns: repeat(26, 1fr);
  grid-template-rows: repeat(15, 1fr);
  aspect-ratio: 26 / 15;
  min-height: 400px;
}

.pitch-row {
  display: contents;
}

.pitch-cell {
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  min-height: 20px;
  min-width: 20px;
  background: transparent;

  &.end-zone {
    background: rgba(26, 61, 14, 0.5);
  }
}

.player-marker {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    z-index: 20;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  &.selected-player {
    border: 3px solid #ffd700;
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
    z-index: 30;
  }

  .player-number {
    font-size: 0.7em;
    font-weight: bold;
    color: inherit;
  }
}

.ball-marker {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  pointer-events: none;

  &.ball-on-player {
    left: 50%;
    z-index: 40;
  }

  &.ball-airborne {
    animation: bounce 1s infinite;
  }

  .ball-image {
    max-width: 30px;
    height: 30px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-5px);
  }
}
</style>
