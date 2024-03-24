<template>
    <v-row no-gutters>
        <v-col cols="12" class="d-flex justify-center align-center text-subtitle-2 mt-3" style="line-height: 0.7;">
            {{ props.title }}
        </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col cols="3" class="d-flex justify-center align-center text-subtitle-2">
            {{ processedHomeStat || 0 }}{{ props.type === 'percentage' ? '%' : '' }}
        </v-col>
        <v-col cols="6" class="d-flex justify-center align-center">
            <v-progress-linear color="blue" bg-color="red" bg-opacity="1" height="10" rounded
                :model-value="progressPercentage" class="py-auto"></v-progress-linear>
        </v-col>
        <v-col cols="3" class="d-flex justify-center align-center text-subtitle-2">
            {{ processedAwayStat || 0 }}{{ props.type === 'percentage' ? '%' : '' }}
        </v-col>
    </v-row>
</template>


<script lang="ts" setup>
import { computed } from 'vue';


const props = defineProps({
    title: { type: String, required: true },
    homeStat: { type: String, required: true },
    awayStat: { type: String, required: true },
    type: { type: String, required: false },
});

const processedHomeStat = computed(() => {
    if(props.type === 'percentage') {
        return Math.round((parseInt(props.homeStat) / (parseInt(props.homeStat) + parseInt(props.awayStat))) * 100)
    }
    return props.homeStat;
});

const processedAwayStat = computed(() => {
    if(props.type === 'percentage') {
        return Math.round((parseInt(props.awayStat) / (parseInt(props.homeStat) + parseInt(props.awayStat))) * 100)
    }
    return props.awayStat;
});

const progressPercentage = computed(() => {
    const percentage = (parseInt(props.homeStat) / (parseInt(props.homeStat) + parseInt(props.awayStat))) * 100;
    if (isNaN(percentage)) {
        return 50;
    }
    return percentage;
});

</script>

<style scoped></style>