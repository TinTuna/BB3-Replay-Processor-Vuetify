<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-8 text-center" elevation="8">
          <v-card-title class="text-h4 font-weight-bold mb-4">
            <v-icon size="48" color="primary" class="mb-2">mdi-magnify</v-icon>
            <br>
            Unseen IDs Finder
          </v-card-title>
          <v-card-text>
            <v-file-input
              v-model="replayFile"
              label="Upload Replay File (.bbr)"
              accept=".bbr"
              show-size
              outlined
              class="mb-4"
            />
            <v-btn color="primary" :disabled="!replayFile || analyzing" class="mb-4" @click="analyzeReplay">
              Analyze Replay
            </v-btn>
            <v-divider class="my-4"></v-divider>
            <div v-if="analyzing">
              <v-skeleton-loader type="table" :loading="true" />
              <div class="text-medium-emphasis mt-2">Analyzing replay file...</div>
            </div>
            <div v-else-if="!replayFile">
              <div class="text-medium-emphasis">
                Upload a replay file to see unseen TeamIDs, PlayerIDs, and more.
              </div>
            </div>
            <div v-else-if="results">
              <div>
                <h3 class="text-h6 font-weight-bold mb-2">Unseen Team IDs</h3>
                <v-alert v-if="results.unseenTeamIds.length === 0" type="success" class="mb-4">No unseen Team IDs found!</v-alert>
                <v-list v-else class="mb-4">
                  <v-list-item v-for="id in results.unseenTeamIds" :key="id">
                    <v-list-item-title>
                      {{ id }}<span v-if="!!getIdTeamRace(id as IdRace)"> - {{ getIdTeamRace(id as IdRace) }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
                <h3 class="text-h6 font-weight-bold mb-2">Unseen Player IDs</h3>
                <v-alert v-if="results.unseenPlayerIds.length === 0" type="success">No unseen Player IDs found!</v-alert>
                <v-list v-else>
                  <v-list-item v-for="id in results.unseenPlayerIds" :key="id">
                    <v-list-item-title>
                      {{ id }}<span v-if="!!getIdPlayerType(id as PlayerIdType)"> - {{ getIdPlayerType(id as PlayerIdType) }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { decodeBase64File } from '@/composables/helperFns/decodeBase64File';
import { unzipFile } from '@/composables/helperFns/unzipFile';
import { processXML } from '@/composables/helperFns/processXML';
import { getIdTeamRace, knownTeamIds } from '@/composables/stringFromIdFunctions/getIdTeamRace';
import { getIdPlayerType, knownPlayerIds } from '@/composables/stringFromIdFunctions/getIdPlayerType';
import type { IdRace } from '@/types/IdTypes/IdRace';
import type { PlayerIdType } from '@/types/IdTypes/PlayerIdTypes';

const replayFile = ref<File | null>(null);
const analyzing = ref(false);
const results = ref<{ unseenTeamIds: string[]; unseenPlayerIds: string[] } | null>(null);

async function analyzeReplay() {
  if (!replayFile.value) return;
  analyzing.value = true;
  results.value = null;
  try {
    // Step 1: Decode and unzip
    const decoded = await decodeBase64File(replayFile.value);
    const unzipped = await unzipFile(decoded);
    // Step 2: Parse XML
    const xmlDoc = await processXML(unzipped);
    // Step 3: Extract IDs
    const foundTeamIds = new Set<string>();
    const foundPlayerIds = new Set<string>();
    // Find all <TeamId>...</TeamId>
    xmlDoc.querySelectorAll('TeamId').forEach(el => foundTeamIds.add(el.textContent || ""));
    // Find all <Player> nodes with Id attribute or <Id> under <Player>
    xmlDoc.querySelectorAll('Player').forEach(playerEl => {
      // Try attribute
      const idAttr = playerEl.getAttribute('Id');
      if (idAttr) foundPlayerIds.add(idAttr);
      // Try <Id> child
      const idChild = playerEl.querySelector('Id');
      if (idChild && idChild.textContent) foundPlayerIds.add(idChild.textContent);
    });
    // Step 4: Compare to known
    console.log(foundTeamIds);
    const unseenTeamIds = Array.from(foundTeamIds).filter(id => id && !knownTeamIds.has(id));
    const unseenPlayerIds = Array.from(foundPlayerIds).filter(id => id && !knownPlayerIds.has(id));
    results.value = { unseenTeamIds, unseenPlayerIds };
  } catch (e) {
    results.value = { unseenTeamIds: [], unseenPlayerIds: [] };
    alert('Error analyzing replay file.');
  } finally {
    analyzing.value = false;
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
