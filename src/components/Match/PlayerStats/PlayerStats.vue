<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-container>
        <v-select
          v-model="selectedPlayer"
          :items="listPlayers"
          item-title="name"
          item-value="id"
          label="Player"
          outlined
          dense
          return-object
        >
        </v-select>
        <!-- Statline -->
        <div>
          <v-row>
            <v-col cols="12" md="6">
              <v-sheet border rounded elevation="2">
                <v-data-table
                  density="compact"
                  :items="playerStats"
                  :headers="headers"
                  items-per-page="100"
                >
                  <template #bottom></template>
                </v-data-table>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="2" v-if="playerData">
                <v-card-title class="text-h4">
                  {{ playerName }}<br />
                  <v-icon
                    color="primary"
                    size="small"
                    style="margin-right: -8px"
                    >{{ `mdi-numeric-${playerData.Number[0]}-box` }}</v-icon
                  >
                  <v-icon
                    v-if="playerData.Number[1]"
                    color="primary"
                    size="small"
                    style="margin-left: -8px"
                    >{{ `mdi-numeric-${playerData.Number[1]}-box` }}</v-icon
                  ><br />
                  <!-- <span class="text-subtitle-2">{{ dataStore.getPlayerType(playerData.IdPlayerTypes) }}</span> -->
                </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col
                      cols="2"
                      v-for="(characteristic, i) in characteristics"
                      :key="i"
                    >
                      <v-tooltip
                        :text="
                          characteristic.tooltip
                            ? characteristic.tooltip
                            : `${characteristic.name}: ${characteristic.value}`
                        "
                        location="bottom"
                      >
                        <template v-slot:activator="{ props }">
                          <v-chip
                            size="large"
                            v-bind="props"
                            :prepend-icon="characteristic.icon"
                            >{{ characteristic.value }}</v-chip
                          >
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col v-if="innateSkills.length" cols="6">
                      <v-sheet
                        border
                        rounded
                        elevation="2"
                        class="d-flex justify-center flex-column my-3 pb-2 px-auto"
                      >
                        <div class="text-h6 py-1">Innate Skills</div>
                        <div class="d-flex flex-wrap justify-center">
                          <template v-for="(skill, i) in innateSkills" :key="i">
                            <v-tooltip :text="skill.name" location="bottom">
                              <template v-slot:activator="{ props }">
                                <span v-bind="props">
                                  <v-sheet
                                    elevation="2"
                                    class="pa-1 d-flex"
                                    color="black"
                                    dark
                                  >
                                    <v-img
                                      v-if="skill.icon"
                                      v-bind="activatorProps"
                                      :src="skill.icon"
                                      width="60"
                                      height="60"
                                      v-ripple
                                      @click.stop="openSkillDialog(skill)"
                                      class="cursor-pointer"
                                    ></v-img>
                                  </v-sheet>
                                </span>
                              </template>
                            </v-tooltip>
                          </template>
                        </div>
                      </v-sheet>
                    </v-col>
                    <v-col v-if="acquiredSkills.length" cols="6">
                      <v-sheet
                        border
                        rounded
                        elevation="2"
                        class="d-flex flex-column my-3 pb-2"
                      >
                        <div class="text-h6 py-1">Acquired Skills</div>
                        <div class="d-flex mx-auto">
                          <template
                            v-for="(skill, i) in acquiredSkills"
                            :key="i"
                          >
                            <v-tooltip :text="skill.name" location="bottom">
                              <template v-slot:activator="{ props }">
                                <span v-bind="props">
                                  <v-sheet
                                    elevation="2"
                                    class="pa-1"
                                    color="black"
                                    dark
                                  >
                                    <v-img
                                      v-bind="activatorProps"
                                      v-if="skill.icon"
                                      :src="skill.icon"
                                      width="60"
                                      height="60"
                                      v-ripple
                                      @click.stop="openSkillDialog(skill)"
                                      class="cursor-pointer"
                                    ></v-img>
                                  </v-sheet>
                                </span>
                              </template>
                            </v-tooltip>
                          </template>
                        </div>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card
        v-if="selectedSkill"
        :title="selectedSkill.name"
        :subtitle="selectedSkill.skillCategory"
      >
        <v-divider class="mt-3"></v-divider>
        <v-card-text v-html="selectedSkill.description"> </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
        <template v-slot:append>
          <v-sheet elevation="2" rounded class="pa-1" color="black" dark>
            <v-img
              v-if="selectedSkill.icon"
              :src="selectedSkill.icon"
              width="75"
              height="75"
            ></v-img>
          </v-sheet>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { Ref, computed, ref, watch } from "vue";
// import { Roster } from "@/types/BaseTags/Roster";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { useDataStore } from "@/store/dataStore";
import {
  Skill,
  SkillId,
} from "@/composables/stringFromIdFunctions/getSkillData";
import { Player } from "@/types/Teams/Player";
import { Characteristic } from "@/types/Teams/Characteristic";
import { getStatName } from "@/composables/stringFromIdFunctions/getStatName";

const dataStore = useDataStore();

const props = defineProps({
  team: { type: String, required: true },
});

const team = ref<number>(parseInt(props.team));

const roster = computed(() => {
  return dataStore.rosters?.TeamRoster[team.value];
});

const listPlayers = computed(() => {
  if (!roster.value?.Players?.PlayerData) return [];

  return roster.value.Players.PlayerData.map((player: Player) => {
    return {
      id: player.Id,
      name: `${player.Name} - ${getIdPlayerType(player.IdPlayerTypes)}`,
    };
  });
});

const selectedPlayer = ref(listPlayers.value[0] || { id: "", name: "" });

// Watch for when players list becomes available
watch(
  listPlayers,
  (newPlayers) => {
    if (newPlayers.length > 0 && !selectedPlayer.value.id) {
      selectedPlayer.value = newPlayers[0];
    }
  },
  { immediate: true }
);

// Watch for navigation state changes and select the player
watch(
  () => [dataStore.selectedPlayerIdForNavigation, dataStore.selectedTeamForNavigation],
  ([playerId, selectedTeam]) => {
    // Only select player if it's for this team
    if (playerId && selectedTeam === team.value.toString() && listPlayers.value.length > 0) {
      const player = listPlayers.value.find((p) => p.id === playerId);
      if (player) {
        selectedPlayer.value = player;
      }
    }
  },
  { immediate: true }
);

const playerMatchData = computed(() => {
  if (!selectedPlayer.value?.id) return null;
  return dataStore.matchData?.playerData?.[selectedPlayer.value.id];
});
const playerName = computed(() => {
  if (!selectedPlayer.value?.id) return "";
  return dataStore.getPlayerName(selectedPlayer.value.id);
});
const playerData = computed(() => {
  if (!selectedPlayer.value?.id) return null;
  return dataStore.getPlayerData(selectedPlayer.value.id) as Player;
});

type LocalCharacteristicType = {
  name: string;
  value: string;
  icon: string;
  tooltip?: string;
};

const characteristics: Ref<LocalCharacteristicType[]> = computed(() => {
  if (!playerData.value?.Characteristics?.PlayerCharacteristic) return [];

  // Sort characteristics by order of characteristic.Characteristic
  const characteristics = [
    ...playerData.value.Characteristics.PlayerCharacteristic,
  ];
  characteristics.sort((a: Characteristic, b: Characteristic) => {
    return parseInt(a.Characteristic) - parseInt(b.Characteristic);
  });
  const baseChars = characteristics.map((characteristic: Characteristic) => {
    let name = "";
    let icon = "mdi-alert";
    let value = "";
    if (!characteristic.Characteristic) characteristic.Characteristic = "0";
    switch (characteristic.Characteristic) {
      case "0":
        name = "Movement";
        value = characteristic.Value;
        icon = "mdi-run";
        break;
      case "1":
        name = "Strength";
        value = characteristic.Value;
        icon = "mdi-arm-flex";
        break;
      case "2":
        name = "Agility";
        value = characteristic.Value;
        icon = "mdi-debug-step-over";
        break;
      case "3":
        name = "Passing";
        value = `${characteristic.Value}+`;
        icon = "mdi-football";
        break;
      case "4":
        name = "Armour Value";
        value = `${characteristic.Value}+`;
        icon = "mdi-shield-half-full";
        break;
    }
    return {
      name,
      value,
      icon,
    } as LocalCharacteristicType;
  });

  if (playerData.value?.Value) {
    baseChars.push({
      name: "Value",
      value: parseInt(playerData.value.Value).toLocaleString(),
      tooltip:
        "Value: " + parseInt(playerData.value.Value).toLocaleString() + "gp",
      icon: "mdi-cash-multiple",
    });
  }

  return baseChars;
});

const playerStats = computed(() => {
  const stats: Array<{ stat: string; value: string; source: string }> = [];

  if (!selectedPlayer.value?.id) return stats;

  // Get match data stats (detailed stats from replay processing)
  if (playerMatchData.value) {
    for (const [key, value] of Object.entries(playerMatchData.value)) {
      // Skip internal IDs
      if (key === "playerId" || key === "teamId") continue;

      // check if value is an object with sub-values
      if (typeof value === "object" && value !== null) {
        for (const [subKey, subValue] of Object.entries(
          value as Record<string, unknown>
        )) {
          stats.push({
            stat: `${key} - ${subKey}`,
            value:
              subValue !== undefined && subValue !== null
                ? subValue.toString()
                : "0",
            source: "match",
          });
        }
      } else {
        stats.push({
          stat: key,
          value: value !== undefined && value !== null ? value.toString() : "0",
          source: "match",
        });
      }
    }
  }

  // Get end game stats (aggregated stats from game result)
  const endGameStats = dataStore.getPlayerStats(selectedPlayer.value.id);
  endGameStats.forEach((stat) => {
    const statInfo = getStatName(stat.StatId);
    stats.push({
      stat: statInfo.name,
      value: stat.Value,
      source: "endgame",
    });
  });

  return stats.sort((a, b) => a.stat.localeCompare(b.stat));
});

const innateSkills = computed(() => {
  if (playerData.value?.InnateSkills?.InnateSkillsItem) {
    if (typeof playerData.value.InnateSkills.InnateSkillsItem === "string") {
      return [
        dataStore.getSkillData(playerData.value.InnateSkills.InnateSkillsItem),
      ];
    }
    return playerData.value.InnateSkills.InnateSkillsItem.map(
      (skill: SkillId) => {
        // Get skill and skill specifics from the skills database
        return dataStore.getSkillData(skill);
      }
    );
  }
  return [];
});
const acquiredSkills = computed(() => {
  if (playerData.value?.AcquiredSkills?.AcquiredSkillsItem) {
    if (
      typeof playerData.value.AcquiredSkills.AcquiredSkillsItem === "string"
    ) {
      return [
        dataStore.getSkillData(
          playerData.value.AcquiredSkills.AcquiredSkillsItem
        ),
      ];
    }
    return playerData.value.AcquiredSkills.AcquiredSkillsItem.map(
      (skill: SkillId) => {
        // Get skill and skill specifics from the skills database
        return dataStore.getSkillData(skill);
      }
    );
  }
  return [];
});

const selectedSkill = ref<Skill | undefined>();

const openSkillDialog = (skill: Skill) => {
  selectedSkill.value = skill;
};

const headers = [
  {
    title: "Stat",
    value: "stat",
    align: "start" as const,
    width: "60%",
    sortable: true,
  },
  { title: "Value", value: "value", align: "center" as const, sortable: true },
  {
    title: "Source",
    value: "source",
    align: "center" as const,
    sortable: true,
  },
];
</script>

<style scoped></style>
