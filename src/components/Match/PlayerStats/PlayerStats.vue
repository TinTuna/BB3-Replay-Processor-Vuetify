<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-container>
        <v-select v-model="selectedPlayer" :items="listPlayers" item-title="name" item-value="id" label="Player"
          outlined dense return-object>
        </v-select>
        <!-- Statline -->
        <div>
          <v-row>
            <v-col cols="12" md="6">
              <v-sheet border rounded elevation="2">
                <v-data-table density="compact" :items="playerStats" :headers="headers" items-per-page="100">
                  <template #bottom></template>
                </v-data-table>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="2">
                <v-card-title class="text-h4">
                  {{ playerName }}<br>
                  <v-icon color="primary" size="small" style="margin-right: -8px">{{
      `mdi-numeric-${playerData.Number[0]}-box`
    }}</v-icon>
                  <v-icon v-if="playerData.Number[1]" color="primary" size="small" style="margin-left: -8px">{{
      `mdi-numeric-${playerData.Number[1]}-box` }}</v-icon><br>
                  <!-- <span class="text-subtitle-2">{{ dataStore.getPlayerType(playerData.IdPlayerTypes) }}</span> -->
                </v-card-title>

                <v-card-text>
                  <v-row>
                    <v-col cols="2" v-for="(characteristic, i) in characteristics" :key="i">
                      <v-tooltip
                        :text="characteristic.tooltip ? characteristic.tooltip : `${characteristic.name}: ${characteristic.value}`"
                        location="bottom">
                        <template v-slot:activator="{ props }">
                          <v-chip size="large" v-bind="props" :prepend-icon="characteristic.icon">{{
      characteristic.value }}</v-chip>
                        </template>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col v-if="innateSkills.length" cols="6">
                      <v-sheet border rounded elevation="2" class="d-flex flex-column my-3 pb-2">
                        <div class="text-h6 py-1">
                          Innate Skills
                        </div>
                        <div class="d-flex mx-auto">
                          <template v-for="(skill, i) in innateSkills" :key="i">
                            <v-tooltip :text="skill.name" location="bottom">
                              <template v-slot:activator="{ props }">
                                <span v-bind="props">
                                  <v-sheet elevation="2" class="pa-1" color="black" dark>
                                    <v-img v-if="skill.icon" v-bind="activatorProps" :src="skill.icon" width="60"
                                      height="60" v-ripple @click.stop="openSkillDialog(skill)"
                                      class="cursor-pointer"></v-img>
                                  </v-sheet>
                                </span>
                              </template>
                            </v-tooltip>
                          </template>
                        </div>
                      </v-sheet>
                    </v-col>
                    <v-col v-if="acquiredSkills.length" cols="6">
                      <v-sheet border rounded elevation="2" class="d-flex flex-column my-3 pb-2">
                        <div class="text-h6 py-1">
                          Acquired Skills
                        </div>
                        <div class="d-flex mx-auto">
                          <template v-for="(skill, i) in acquiredSkills" :key="i">
                            <v-tooltip :text="skill.name" location="bottom">
                              <template v-slot:activator="{ props }">
                                <span v-bind="props">
                                  <v-sheet elevation="2" class="pa-1" color="black" dark>
                                    <v-img v-bind="activatorProps" v-if="skill.icon" :src="skill.icon" width="60"
                                      height="60" v-ripple @click.stop="openSkillDialog(skill)"
                                      class="cursor-pointer"></v-img>
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
      <v-card v-if="selectedSkill" :title="selectedSkill.name" :subtitle="selectedSkill.skillCategory">
        <v-divider class="mt-3"></v-divider>
        <v-card-text v-html="selectedSkill.description">
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
        <template v-slot:append>
          <v-sheet elevation="2" rounded class="pa-1" color="black" dark>
            <v-img v-if="selectedSkill.icon" :src="selectedSkill.icon" width="75" height="75"></v-img>
          </v-sheet>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>


<script lang="ts" setup>
import { Ref, computed, ref } from "vue";
import { Roster } from "@/types/BaseTags/Roster";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { useDataStore } from "@/store/dataStore";
import { VDataTable } from "vuetify/lib/components/index.mjs";
import { SkillData } from "@/composables/stringFromIdFunctions/getSkillData";

const dataStore = useDataStore();

const props = defineProps({
  team: { type: String, required: true }
});

const team = ref<number>(parseInt(props.team));

const roster = ref<Roster>(dataStore.rosters?.TeamRoster[team.value] as Roster);

const listPlayers = computed(() => {
  return roster.value.Players.PlayerData.map((player) => {
    return {
      id: player.Id,
      name: `${player.Name} - ${getIdPlayerType(player.IdPlayerTypes)}`
    };
  });
});

const selectedPlayer = ref(listPlayers.value[0]);

const playerMatchData = computed(() => {
  return dataStore.matchData?.playerData?.[selectedPlayer.value.id];
});
const playerName = computed(() => {
  return dataStore.getPlayerName(selectedPlayer.value.id);
});
const playerData = computed(() => {
  return dataStore.getPlayerData(selectedPlayer.value.id);
});

type Characteristic = {
  name: string;
  value: string;
  icon: string;
  tooltip?: string;
};

const characteristics: Ref<Characteristic[]> = computed(() => {
  // Sort characteristics by order of characteristic.Characteristic
  const characteristics = playerData.value.Characteristics.PlayerCharacteristic
  characteristics.sort((a, b) => {
    return parseInt(a.Characteristic) - parseInt(b.Characteristic);
  });
  const baseChars = characteristics.map((characteristic) => {
    let name = '';
    let icon = 'mdi-alert';
    let value = '';
    if (!characteristic.Characteristic) characteristic.Characteristic = '0';
    switch (characteristic.Characteristic) {
      case '0':
        name = 'Movement';
        value = characteristic.Value;
        icon = 'mdi-run';
        break;
      case '1':
        name = 'Strength';
        value = characteristic.Value;
        icon = 'mdi-arm-flex';
        break;
      case '2':
        name = 'Agility';
        value = characteristic.Value;
        icon = 'mdi-debug-step-over';
        break;
      case '3':
        name = 'Passing';
        value = `${characteristic.Value}+`;
        icon = 'mdi-football';
        break;
      case '4':
        name = 'Armour Value';
        value = `${characteristic.Value}+`;
        icon = 'mdi-shield-half-full';
        break;
    }
    return {
      name,
      value,
      icon,
    } as Characteristic;
  });
  baseChars.push(
    {
      name: 'Value',
      value: parseInt(playerData.value.Value).toLocaleString(),
      tooltip: 'Value: ' + parseInt(playerData.value.Value).toLocaleString() + 'gp',
      icon: 'mdi-cash-multiple'
    }
  );
  return baseChars;
});

const playerStats = computed(() => {
  const stats = [];
  if (playerMatchData.value) {
    for (const [key, value] of Object.entries(playerMatchData.value)) {
      // check if value is an object with sub-values
      if (typeof value === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          stats.push({
            stat: `${key} ${subKey}`,
            value: subValue || '-',
            team: '-',
            percent: '-'
          });
        }
      } else {
        stats.push({
          stat: key,
          value: value || '-',
          team: '-',
          percent: '-'
        });
      }

    }
  }
  return stats;
});



const innateSkills = computed(() => {
  if (playerData.value?.InnateSkills?.InnateSkillsItem) {
    if (typeof playerData.value.InnateSkills.InnateSkillsItem === 'string') {
      return [
        dataStore.getSkillData(playerData.value.InnateSkills.InnateSkillsItem)
      ];
    }
    return playerData.value.InnateSkills.InnateSkillsItem.map((skill) => {
      // Get skill and skill specifics from the skills database
      return dataStore.getSkillData(skill);
    });
  }
  return [];
});
const acquiredSkills = computed(() => {
  if (playerData.value?.AcquiredSkills?.AcquiredSkillsItem) {
    if (typeof playerData.value.AcquiredSkills.AcquiredSkillsItem === 'string') {
      return [
        dataStore.getSkillData(playerData.value.AcquiredSkills.AcquiredSkillsItem)
      ];
    }
    return playerData.value.AcquiredSkills.AcquiredSkillsItem.map((skill) => {
      // Get skill and skill specifics from the skills database
      return dataStore.getSkillData(skill);
    });
  }
  return [];
});

const selectedSkill = ref<SkillData | undefined>();

const openSkillDialog = (skill: SkillData) => {
  selectedSkill.value = skill;
};

const headers = [
  { title: "Stat", value: "stat", align: "center", width: "50%", sortable: true },
  { title: "Value", value: "value", align: "center", sortable: true },
  { title: "Team Total", value: "team", align: "center", sortable: true },
  { title: "% of Team", value: "percent", align: "center", sortable: true },
] as unknown as any[];

</script>

<style scoped></style>