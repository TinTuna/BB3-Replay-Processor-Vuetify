<template>
    <v-container>
        <MatchTimeline />
        <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="logEntry in dataStore.matchData?.matchLog" :key="logEntry.turn">
                <v-expansion-panel-title :color="logEntry.team === '0' ? 'red-lighten-2' : 'blue-lighten-2'">
                    Turn {{ logEntry.turn }} - {{ logEntry.team === "0" ? dataStore.getTeamName("0") :
                        dataStore.getTeamName("1") }}
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
                                    color="red">mdi-hospital-box-outline</v-icon>
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
                <v-expansion-panel-text>
                    <Turn :log-entry-prop="logEntry" />
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>
      
      
<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import Turn from "./Turn.vue";
import MatchTimeline from "./MatchTimeline.vue";

const dataStore = useDataStore();

</script>
        
<style scoped></style>