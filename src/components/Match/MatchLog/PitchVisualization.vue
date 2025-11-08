<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-row>
        <v-col cols="12">
          <div class="pitch-container">
            <!-- Team logo backgrounds -->
            <div
              class="team-logo-background team-logo-home"
              :style="{ backgroundImage: `url(${homeTeamLogo.logo})` }"
            ></div>
            <div
              class="team-logo-background team-logo-away"
              :style="{ backgroundImage: `url(${awayTeamLogo.logo})` }"
            ></div>
            <!-- SVG overlay for pitch markings (always visible) -->
            <svg
              class="pitch-markings-overlay"
              viewBox="0 0 26 15"
              preserveAspectRatio="none"
            >
              <!-- Solid white edge line -->
              <line
                x1="0"
                y1="0"
                x2="26"
                y2="0"
                stroke="white"
                stroke-width="0.05"
                stroke-linecap="round"
              />
              <line
                x1="0"
                y1="15"
                x2="26"
                y2="15"
                stroke="white"
                stroke-width="0.05"
                stroke-linecap="round"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="15"
                stroke="white"
                stroke-width="0.05"
                stroke-linecap="round"
              />
              <line
                x1="26"
                y1="0"
                x2="26"
                y2="15"
                stroke="white"
                stroke-width="0.05"
                stroke-linecap="round"
              />
              <!-- Solid white center line (line of scrimmage) -->
              <line
                x1="13"
                y1="0"
                x2="13"
                y2="15"
                stroke="white"
                stroke-width="0.1"
                stroke-linecap="round"
              />
              <!-- Solid white endzone line -->
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="15"
                stroke="white"
                stroke-width="0.05"
                stroke-linecap="round"
              />
              <line
                x1="25"
                y1="0"
                x2="25"
                y2="15"
                stroke="white"
                stroke-width="0.05"
                stroke-linecap="round"
              />
              <!-- Dashed white lines 4 cells from each edge -->
              <line
                x1="1"
                y1="4"
                x2="25"
                y2="4"
                stroke="white"
                stroke-width="0.05"
                stroke-dasharray="0.25"
                stroke-dashoffset="0.125"
                stroke-linecap="round"
              />
              <line
                x1="1"
                y1="11"
                x2="25"
                y2="11"
                stroke="white"
                stroke-width="0.05"
                stroke-dasharray="0.25"
                stroke-dashoffset="0.125"
                stroke-linecap="round"
              />
            </svg>
            <!-- SVG overlay for movement path lines and push paths -->
            <svg
              v-if="
                (selectedMovementPath && selectedMovementPath.length > 1) ||
                (selectedPushPaths && selectedPushPaths.length > 0)
              "
              class="movement-path-overlay"
              viewBox="0 0 26 15"
              preserveAspectRatio="none"
            >
              <!-- Arrow marker definition for movement -->
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="0.5"
                  markerHeight="0.5"
                  refX="0.2"
                  refY="0.25"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <polygon
                    points="0 0, 0.4 0.25, 0 0.5"
                    :style="{
                      fill: getMovementPathStyle().stroke || '#ffd700',
                    }"
                  />
                </marker>
                <!-- Arrow marker definition for pushes (red/orange) -->
                <marker
                  id="push-arrowhead"
                  markerWidth="0.5"
                  markerHeight="0.5"
                  refX="0.2"
                  refY="0.25"
                  orient="auto"
                  markerUnits="userSpaceOnUse"
                >
                  <polygon
                    points="0 0, 0.4 0.25, 0 0.5"
                    style="fill: #ff4444"
                  />
                </marker>
              </defs>
              <!-- Movement path -->
              <polyline
                v-if="selectedMovementPath && selectedMovementPath.length > 1"
                :points="getMovementPathPoints()"
                class="movement-path-line"
                :style="getMovementPathStyle()"
                fill="none"
                marker-end="url(#arrowhead)"
              />
              <!-- Push paths -->
              <g v-if="selectedPushPaths && selectedPushPaths.length > 0">
                <line
                  v-for="(pushPath, index) in selectedPushPaths"
                  :key="`push-${index}`"
                  :x1="parseInt(pushPath.from.X) + 0.5"
                  :y1="parseInt(pushPath.from.Y) + 0.5"
                  :x2="parseInt(pushPath.to.X) + 0.5"
                  :y2="parseInt(pushPath.to.Y) + 0.5"
                  class="push-path-line"
                  stroke="#ff4444"
                  stroke-width="0.2"
                  marker-end="url(#push-arrowhead)"
                />
              </g>
            </svg>
            <div class="pitch-grid">
              <div v-for="y in 15" :key="`row-${y}`" class="pitch-row">
                <div
                  v-for="x in 26"
                  :key="`cell-${x}-${y}`"
                  class="pitch-cell"
                  :class="[
                    getCellClass(x - 1, y - 1),
                    { 'in-movement-path': isInMovementPath(x - 1, y - 1) },
                    { 'in-push-path': isInPushPath(x - 1, y - 1) },
                    { 'checkerboard-square': (x + y) % 2 === 0 },
                  ]"
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
import { TurnAction } from "@/types/Match/TurnAction";
import ballImageSrc from "@/assets/ball.webp";

const props = defineProps<{
  turn: number;
  team: "0" | "1";
  playerId?: string;
  selectedAction?: TurnAction;
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

const homeTeamLogo = computed(() => {
  return dataStore.getTeamLogo("0");
});

const awayTeamLogo = computed(() => {
  return dataStore.getTeamLogo("1");
});

const ballImage = ballImageSrc;

// Get movement path for selected player
const selectedMovementPath = computed(() => {
  if (!selectedPlayerId.value || !turnData.value) {
    return null;
  }

  const turnActions = turnData.value.turnActions || [];
  const playerAction = turnActions.find(
    (action) => action.playerId === selectedPlayerId.value
  );

  return playerAction?.movementPath || null;
});

// Get push paths from selected action
const selectedPushPaths = computed(() => {
  if (!props.selectedAction) {
    return null;
  }

  return props.selectedAction.pushPaths || null;
});

const isInMovementPath = (x: number, y: number): boolean => {
  if (!selectedMovementPath.value) return false;

  return selectedMovementPath.value.some(
    (cell) => parseInt(cell.X) === x && parseInt(cell.Y) === y
  );
};

const isInPushPath = (x: number, y: number): boolean => {
  if (!selectedPushPaths.value) return false;

  return selectedPushPaths.value.some(
    (pushPath) =>
      (parseInt(pushPath.from.X) === x && parseInt(pushPath.from.Y) === y) ||
      (parseInt(pushPath.to.X) === x && parseInt(pushPath.to.Y) === y)
  );
};

const getMovementPathPoints = (): string => {
  if (!selectedMovementPath.value) return "";

  // Convert cell coordinates to SVG coordinates (centered in each cell)
  return selectedMovementPath.value
    .map((cell) => {
      const x = parseInt(cell.X) + 0.5;
      const y = parseInt(cell.Y) + 0.5;
      return `${x},${y}`;
    })
    .join(" ");
};

const getMovementPathStyle = () => {
  if (!selectedPlayerId.value) return {};

  const selectedPlayer = displayPlayers.value.find(
    (p) => p.id === selectedPlayerId.value
  );
  if (!selectedPlayer) return {};

  const colours =
    selectedPlayer.team === "0" ? homeTeamColours.value : awayTeamColours.value;

  return {
    stroke: colours.primary || "#ffd700",
    strokeWidth: "0.2",
  };
};

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

  // Use the selected action's pitch state if available, otherwise fall back to turn's pitch state
  let pitchState = null;
  if (props.selectedAction?.pitchState) {
    // Convert ActionPitchState to the format expected by the component
    pitchState = {
      playerPositions: props.selectedAction.pitchState.playerPositions,
      ballPosition: props.selectedAction.pitchState.ballPosition,
    };
  } else {
    pitchState = dataStore.getPitchState(
      turnData.value.turn,
      turnData.value.team
    );
  }

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
  () => [props.turn, props.team, props.isPanelOpen, props.selectedAction],
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
  background-color: green;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.team-logo-background {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}

.team-logo-home {
  left: 0;
}

.team-logo-away {
  right: 0;
}

.pitch-markings-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.movement-path-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.movement-path-line {
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
}

.push-path-line {
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 2px rgba(255, 68, 68, 0.8));
  opacity: 0.9;
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
  transition: background-color 0.2s;

  // Checkerboard pattern: cells where (x + y) is even get the background
  // This creates true offset squares like a checkerboard
  &.checkerboard-square {
    background: rgba(255, 255, 255, 0.03);
  }

  &.end-zone {
    background: rgba(26, 61, 14, 0.5);
  }

  // &.wide-zone {
  //   background: rgba(0, 0, 0, 0.5);
  // }

  &.in-movement-path {
    background: rgba(255, 215, 0, 0.3);
    border: 1px solid rgba(255, 215, 0, 0.6);
    box-shadow: inset 0 0 5px rgba(255, 215, 0, 0.4);
  }

  &.in-push-path {
    background: rgba(255, 68, 68, 0.2);
    border: 1px solid rgba(255, 68, 68, 0.5);
    box-shadow: inset 0 0 5px rgba(255, 68, 68, 0.3);
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
  z-index: 400;

  &.ball-on-player {
    left: 50%;
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
