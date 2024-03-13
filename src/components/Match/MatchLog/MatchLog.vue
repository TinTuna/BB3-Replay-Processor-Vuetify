<template>
    <v-container>
        <MatchTimeline :drilldown="handleDrilldown" />
        <v-expansion-panels variant="accordion" v-model="matchPanels">
            <v-expansion-panel v-for="logEntry in dataStore.matchData?.matchLog" :key="logEntry.turn" :id="`turn-${logEntry.turn}-${logEntry.team}`">
                <v-expansion-panel-title :color="logEntry.team === '0' ? 'red-lighten-2' : 'blue-lighten-2'">
                    Turn {{ logEntry.turn }} - {{ dataStore.getTeamName(logEntry.team) }}
                    <v-spacer />
                    <div v-if="logEntry.death || logEntry.injury || logEntry.touchdown || logEntry.turnover"
                        class="px-2 py-1 mr-5" style="background-color: white; border-radius: 3px;">
                        <v-tooltip text="Death" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" v-if="logEntry.death" color="black">mdi-skull</v-icon>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Injury" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" v-if="logEntry.injury"
                                    color="red">mdi-hospital-box</v-icon>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Touchdown" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" v-if="logEntry.touchdown"
                                    color="brown">mdi-football</v-icon>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Turnover" location="bottom">
                            <template v-slot:activator="{ props }">
                                <v-icon v-bind="props" v-if="logEntry.turnover"
                                    color="amber">mdi-alert-box</v-icon>
                            </template>
                        </v-tooltip>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text :class="logEntry.team === '0' ? 'bg-red-lighten-4' : 'bg-blue-lighten-4'">
                    <Turn :log-entry-prop="logEntry" />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>
      
      
<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import Turn from "./Turn.vue";
import MatchTimeline, { Event } from "./MatchTimeline.vue";
import { ref } from "vue";

const dataStore = useDataStore();

const matchPanels = ref<number>();

const handleDrilldown = (event: Event) => {
    // open the coresponding expansion panel
    if (event.drilldown?.turn) {
        // check if the turn was played by this team, if not its the next match log entry
        const thisLogEntry = dataStore.matchData?.matchLog[(event.drilldown?.turn - 1) * 2].team === event.drilldown?.team
        matchPanels.value = ((event.drilldown?.turn - 1) * 2) + (thisLogEntry ? 0 : 1);
    }
    // scroll to the open panel
    const el = document.getElementById(`turn-${event.drilldown?.turn}-${event.drilldown?.team}`);
    if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
};

</script>
        
<style scoped></style>