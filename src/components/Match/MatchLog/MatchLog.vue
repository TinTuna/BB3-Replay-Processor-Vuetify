<template>
    <v-container>
        <v-row>
            <v-col cols="8">
                <v-expansion-panels variant="accordion" v-model="matchPanels">
                    <v-expansion-panel v-for="logEntry in dataStore.matchData?.matchLog" :key="logEntry.turn"
                        :id="`turn-${logEntry.turn}-${logEntry.team}`">
                        <v-expansion-panel-title class="py-1"
                            :color="logEntry.team === '0' ? 'blue-grey-lighten-4' : 'light-blue-lighten-4'"
                            :class="logEntry.team === '0' ? 'home-stripe' : 'away-stripe'">
                            <div class="logo ml-1 mr-12">
                                <v-img :src="logEntry.team === '0' ? homeTeamLogo.logo : awayTeamLogo.logo" />
                            </div>
                            Turn {{ logEntry.turn }} - {{ dataStore.getTeamName(logEntry.team) }}
                            <v-spacer />
                            <div v-if="logEntry.death || logEntry.injury || logEntry.touchdown || logEntry.turnover || logEntry.injurySustained"
                                class="px-2 py-1 mr-5" style="background-color: white; border-radius: 3px;">
                                <v-tooltip text="Death" location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <template v-for="(death, i) in logEntry.death" :key="i">
                                            <v-icon v-bind="props" v-if="death" color="black">mdi-skull</v-icon>
                                        </template>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Injury Inflicted" location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <template v-for="(injury, i) in logEntry.injury" :key="i">
                                            <v-icon v-if="injury" v-bind="props" color="error">mdi-sword</v-icon>
                                        </template>
                                        <!-- <v-chip v-if="logEntry.injury" v-bind="props" variant="flat" color="red" small><v-icon v-if="logEntry.injury"
                                            color="white">mdi-sword</v-icon><span class="text-white">x3</span></v-chip> -->
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Injury Sustained" location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <template v-for="(injurySustained, i) in logEntry.injurySustained" :key="i">
                                            <v-icon v-bind="props" v-if="injurySustained"
                                                color="error">mdi-hospital-box</v-icon>
                                        </template>
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
                        <v-expansion-panel-text
                            :style="`background-color:${logEntry.team === '0' ? '#ECEFF1' : '#E1F5FE'}; border-left:2px solid ${logEntry.team === '0' ? homeTeamColours.primary : awayTeamColours.primary};`">
                            <Turn v-if="logEntry.turnActions.length" :log-entry-prop="logEntry" />
                            <v-container v-else>
                                <v-row>
                                    <v-col cols="12">
                                        <v-card height="200" width="200">
                                            <v-img :src="waiting" cover></v-img>
                                            <v-card-text>
                                                <div>Looks like a pretty quiet turn...</div>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
            <v-col cols="4">
                <MatchTimeline :drilldown="handleDrilldown" />
            </v-col>
        </v-row>
    </v-container>
</template>


<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import Turn from "./Turn.vue";
import MatchTimeline, { Event } from "./MatchTimeline.vue";
import { ref } from "vue";
import { computed } from "vue";

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

const homeTeamColours = computed(() => {
    return dataStore.getTeamColours("0");
});
const awayTeamColours = computed(() => {
    return dataStore.getTeamColours("1");
});

const homeColoursPrimary = computed(() => {
    return homeTeamColours.value.primary;
});
const homeoloursSecondary = computed(() => {
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
.home-stripe {
    background-image: linear-gradient(135deg, #ffffff00 2%, v-bind(homeColoursPrimary) 2%, v-bind(homeColoursPrimary) 7%, #ffffff00 7%),
        linear-gradient(135deg, #ffffff00 1%, v-bind(homeoloursSecondary) 1%, v-bind(homeoloursSecondary) 2%, #ffffff00 2%),
        linear-gradient(135deg, #ffffff00 7%, v-bind(homeColoursTertiary) 7%, v-bind(homeColoursTertiary) 8%, #ffffff00 8%);
    background-size: 100%, 100%, 100%;
    background-repeat: no-repeat, no-repeat, no-repeat;
    /* To avoid multiple instances */
}

.away-stripe {
    background-image: linear-gradient(135deg, #ffffff00 2%, v-bind(awayColoursPrimary) 2%, v-bind(awayColoursPrimary) 7%, #ffffff00 7%),
        linear-gradient(135deg, #ffffff00 1%, v-bind(awayColoursSecondary) 1%, v-bind(awayColoursSecondary) 2%, #ffffff00 2%),
        linear-gradient(135deg, #ffffff00 7%, v-bind(awayColoursTertiary) 7%, v-bind(awayColoursTertiary) 8%, #ffffff00 8%);
    background-size: 100%, 100%, 100%;
    background-repeat: no-repeat, no-repeat, no-repeat;
    /* To avoid multiple instances */
}

.logo {
    height: 35px;
    width: 35px;
    background-color: #ffffff80;
    border-radius: 50%
}
</style>