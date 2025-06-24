<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-8 text-center" elevation="8">
          <v-card-title class="text-h3 font-weight-bold mb-4">
            <v-icon size="64" color="primary" class="mb-4">mdi-cog-sync</v-icon>
            <br>
            Replay Processor
          </v-card-title>

          <v-card-subtitle class="text-h6 mb-6">
            Under Reconstruction
          </v-card-subtitle>

          <v-card-text class="text-body-1 mb-6">
            <p class="mb-4">
              We're currently rebuilding the Replay Processor with enhanced features and improved performance.
            </p>
            <p class="mb-4">
              The new version will include:
            </p>
            <v-list class="bg-transparent">
              <v-list-item prepend-icon="mdi-check-circle" color="success">
                <v-list-item-title>Enhanced replay analysis</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" color="success">
                <v-list-item-title>Improved user interface</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" color="success">
                <v-list-item-title>Better performance and stability</v-list-item-title>
              </v-list-item>
              <v-list-item prepend-icon="mdi-check-circle" color="success">
                <v-list-item-title>New features and capabilities</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>

          <!-- <v-card-actions class="justify-center">
            <v-progress-circular
              indeterminate
              color="primary"
              size="32"
              class="mr-4"
            ></v-progress-circular>
            <span class="text-body-2">Coming Soon...</span>
          </v-card-actions> -->

          <v-divider class="my-6"></v-divider>

          <v-card-text class="text-caption text-medium-emphasis">
            <p>
              Stay tuned for updates! The new Replay Processor will be available soon.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// Component logic can be added here when needed
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}

.v-list-item {
  min-height: 40px;
}
</style>
