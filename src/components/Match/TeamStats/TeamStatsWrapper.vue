<template>
  <v-card>
    <v-tabs v-model="tab" color="primary" align-tabs="center">
      <v-tab value="home">{{
        dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[0]
          .Roster.Name
      }}</v-tab>
      <v-tab value="away">{{
        dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[1]
          .Roster.Name
      }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="home">
          <TeamStats team="0" />
        </v-window-item>
        <v-window-item value="away">
          <TeamStats team="1" />
        </v-window-item>
      </v-window>
    </v-card-text>

    <v-sheet border>
      <v-data-table
        density="comfortable"
        :items="teamStats"
        :headers="headers"
        items-per-page="16"
      >
        <template #bottom></template>
      </v-data-table>
    </v-sheet>
  </v-card>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import TeamStats from "@/components/Match/TeamStats/TeamStats.vue";
import { useDataStore } from "@/store/dataStore";
import { getStatName } from "@/composables/stringFromIdFunctions/getStatName";

const dataStore = useDataStore();

const tab = ref<string>("home");

const headers = [
  { title: "Stat", key: "stat", align: "start", width: "50%" },
  {
    title:
      dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[0]
        .Roster.Name,
    key: "home",
    align: "center",
    width: "25%",
  },
  {
    title:
      dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[1]
        .Roster.Name,
    key: "away",
    align: "center",
    width: "25%",
  },
] as unknown as any[];

const teamStats = computed(() => {
  const homeStats = dataStore.getAllTeamStats("0");
  const awayStats = dataStore.getAllTeamStats("1");

  // Create a map of all unique stat IDs
  const statMap = new Map<
    string,
    { stat: string; home: string; away: string; category: string }
  >();

  // Add home team stats
  homeStats.forEach((stat) => {
    const statInfo = getStatName(
      stat.StatId as import("@/types/IdTypes/StatIdTypes").StatIdType
    );
    statMap.set(stat.StatId, {
      stat: statInfo.name,
      home: stat.Value,
      away: "0",
      category: statInfo.category || "general",
    });
  });

  // Add/update with away team stats
  awayStats.forEach((stat) => {
    const statInfo = getStatName(
      stat.StatId as import("@/types/IdTypes/StatIdTypes").StatIdType
    );
    const existing = statMap.get(stat.StatId);
    if (existing) {
      existing.away = stat.Value;
    } else {
      statMap.set(stat.StatId, {
        stat: statInfo.name,
        home: "0",
        away: stat.Value,
        category: statInfo.category || "general",
      });
    }
  });

  // Convert to array and sort
  return Array.from(statMap.values()).sort((a, b) => {
    // Sort by category first, then by statistic name
    if (a.category !== b.category) {
      const order = ["offense", "defense", "movement", "general"];
      return order.indexOf(a.category) - order.indexOf(b.category);
    }
    return a.stat.localeCompare(b.stat);
  });
});
</script>

<style scoped></style>
