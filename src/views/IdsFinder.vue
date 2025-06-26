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
            <v-btn color="primary" :disabled="!replayFile || isLoading" class="mb-4" @click="analyzeReplay">
              Analyze Replay
            </v-btn>
            <v-divider class="my-4"></v-divider>
            <v-alert
              v-if="error"
              type="error"
              class="mb-4"
              closable
              @click:close="clearError"
            >
              {{ error }}
            </v-alert>
            <div v-if="isLoading">
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
                  <v-list-item v-for="id in results.unseenTeamIds" :key="id.id">
                    <v-list-item-title>
                      ID: {{ id.id }} - {{ id.name }}<span v-if="!!getIdTeamRace(id.id as IdRace)"> - {{ getIdTeamRace(id.id as IdRace) }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
                <h3 class="text-h6 font-weight-bold mb-2">Unseen Player Positional IDs</h3>
                <v-alert v-if="results.unseenPlayerIds.length === 0" type="success">No unseen Player IDs found!</v-alert>
                <v-list v-else>
                  <v-list-item v-for="id in results.unseenPlayerIds" :key="id.id">
                    <v-list-item-title>
                      ID:{{ id.id }} - {{ id.name }}<span v-if="!!getIdPlayerType(id.id as PlayerIdType)"> - {{ getIdPlayerType(id.id as PlayerIdType) }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
                <h3 class="text-h6 font-weight-bold mb-2">Unseen Skills</h3>
                <v-alert v-if="results.unseenSkills.length === 0" type="success">No unseen skills found!</v-alert>
                <v-list v-else>
                  <v-list-item v-for="player in results.unseenSkills" :key="player.playerName">
                    <v-list-item-title>
                      <strong>{{ player.playerName }}</strong>
                      <ul>
                        <li v-for="skill in player.skills" :key="skill">
                          Skill ID: {{ skill }}
                        </li>
                      </ul>
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
import { useBbrFileProcessor } from '@/composables/helperFns/processBbrFile';
import { getIdTeamRace, knownTeamIds } from '@/composables/stringFromIdFunctions/getIdTeamRace';
import { getIdPlayerType, knownPlayerIds } from '@/composables/stringFromIdFunctions/getIdPlayerType';
import { knownSkillIds } from '@/composables/stringFromIdFunctions/getSkillData';
import type { IdRace } from '@/types/IdTypes/IdRace';
import type { PlayerIdType } from '@/types/IdTypes/PlayerIdTypes';

const replayFile = ref<File | null>(null);
const results = ref<{
  unseenTeamIds: { id: string; name: string }[];
  unseenPlayerIds: { id: string; name: string }[];
  unseenSkills: { playerName: string; skills: string[] }[];
} | null>(null);

const { processFile, isLoading, error } = useBbrFileProcessor();

async function analyzeReplay() {
  if (!replayFile.value) return;

  results.value = null;

  try {
    // Use the new composable to process the BBR file
    const xmlDoc = await processFile(replayFile.value);

    console.log(xmlDoc);

    // Extract IDs
    const foundTeamIds = new Set<{ id: string; name: string }>();
    const foundPlayerIds = new Set<{ id: string; name: string }>();
    const playerSkillMap = new Map<string, { playerName: string; skills: string[] }>();

    // Find all Roster
    xmlDoc.querySelectorAll('Roster').forEach(el => {
      const teamRaceId = el.querySelector('Team > IdRace')?.textContent?.trim();
      const name = el.querySelector(':scope > Name')?.textContent?.trim();
      if (teamRaceId && name) foundTeamIds.add({ id: teamRaceId, name });

      const players = el.querySelectorAll('PlayerData');
      players.forEach(player => {
        const id = player.querySelector('IdPlayerTypes')?.textContent?.trim();
        const name = player.querySelector(':scope > Name')?.textContent?.trim() || '(unknown)';
        if (id && name) foundPlayerIds.add({ id, name });

        let skills: string[] = [];
        player.querySelectorAll('InnateSkillsItem').forEach(skillEl => {
          const skillId = skillEl.textContent?.trim();
          if (skillId && !knownSkillIds.has(skillId)) {
            skills.push(skillId);
          }
        });
        player.querySelectorAll('AcquiredSkillsItem').forEach(skillEl => {
          const skillId = skillEl.textContent?.trim();
          if (skillId && !knownSkillIds.has(skillId)) {
            skills.push(skillId);
          }
        });
        if (skills.length > 0) {
          playerSkillMap.set(name, { playerName: name, skills });
        }
      });
    });

    const unseenSkills = Array.from(playerSkillMap.values());
    const unseenTeamIds = Array.from(foundTeamIds).filter(id => id && !knownTeamIds.has(id.id as IdRace));
    const unseenPlayerIds = Array.from(foundPlayerIds).filter(id => id && !knownPlayerIds.has(id.id as PlayerIdType));
    results.value = { unseenTeamIds, unseenPlayerIds, unseenSkills };
  } catch (e) {
    results.value = { unseenTeamIds: [], unseenPlayerIds: [], unseenSkills: [] };
    // Error is already handled by the composable
  }
}

const clearError = () => {
  error.value = null;
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
