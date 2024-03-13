<template>
  <v-container>
    <v-select v-model="selectedPlayer" :items="listPlayers" item-title="name" item-value="id" label="Player" outlined
      dense return-object>
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
              <v-icon color="primary" size="small"
                style="margin-right: -4px">{{ `mdi-numeric-${playerData.Number[0]}-box` }}</v-icon>
              <v-icon v-if="playerData.Number[1]" color="primary" size="small"
                style="margin-left: -4px">{{ `mdi-numeric-${playerData.Number[1]}-box` }}</v-icon><br>
              <!-- <span class="text-subtitle-2">{{ dataStore.getPlayerType(playerData.IdPlayerTypes) }}</span> -->
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="2" v-for="(characteristic, i) in characteristics" :key="i">
                  <v-tooltip :text="characteristic.tooltip ? characteristic.tooltip : `${characteristic.name}: ${characteristic.value}`"
                    location="bottom">
                    <template v-slot:activator="{ props }">
                      <v-chip size="large" v-bind="props"
                        :prepend-icon="characteristic.icon">{{ characteristic.value }}</v-chip>
                    </template>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>


<script lang="ts" setup>
import { Ref, computed, ref } from "vue";
import { Roster } from "@/types/BaseTags/Roster";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { useDataStore } from "@/store/dataStore";
import { VDataTable } from "vuetify/lib/components/index.mjs";

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
  const baseChars = playerData.value.Characteristics.PlayerCharacteristic.map((characteristic) => {
    let name = '';
    let icon = 'mdi-alert';
    let value = '';
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

const headers = [
  { title: "Stat", value: "stat", align: "center", width: "50%", sortable: true },
  { title: "Value", value: "value", align: "center", sortable: true },
  { title: "Team Total", value: "team", align: "center", sortable: true },
  { title: "% of Team", value: "percent", align: "center", sortable: true },
] as unknown as any[];

</script>

<style scoped></style>