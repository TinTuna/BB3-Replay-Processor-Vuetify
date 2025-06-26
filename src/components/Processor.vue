<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex text-center fill-height">
      <v-container class="pa-2" style="margin-top: 7vh">
        <v-card v-if="!loading && !loaded">
          <v-card-text>
            <v-file-input
              class="mb-4"
              v-model="bbrFile"
              show-size
              label="Replay BBR file"
              accept=".bbr"
              hide-details
            ></v-file-input>
            <v-btn class="ma-1" color="#03045E" @click="processReplayFile"
              >Process Replay File</v-btn
            >
            <v-spacer></v-spacer>
            <v-label
              id="errorText"
              v-if="!bbrFile"
              class="font-weight-bold ma-1"
              style="color: rgb(156, 0, 0); display: none"
              >Select a file to load</v-label
            >
            <v-alert
              v-if="error"
              type="error"
              class="mt-2"
              closable
              @click:close="clearError"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
        <div v-if="loading && !loaded">
          <v-label class="font-weight-bold ma-3">Processing file...</v-label>
        </div>
        <div v-if="loaded">
          <v-btn color="red" class="mx-2" @click="reset">
            <v-icon class="mr-1">mdi-reload</v-icon>
            Load new file
          </v-btn>
          <v-btn
            color="#03045E"
            class="mx-2"
            @click="downloadProcessedReplayFile"
          >
            <v-icon class="mr-1">mdi-download</v-icon>
            Download Full Replay XML
          </v-btn>
        </div>
      </v-container>
      <v-container v-if="loaded">
        <Wrapper :processedReplay="processedReplay" />
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Wrapper from "@/components/Match/Wrapper.vue";
import { useBbrFileProcessor } from "@/composables/helperFns/processBbrFile";
import { useXmlDownloader } from "@/composables/helperFns/downloadProcessedXml";

const bbrFile = ref<File>();
const loaded = ref(false);
const processedReplay = ref<Document>(
  new DOMParser().parseFromString("", "text/xml")
);

const { processFile, isLoading: loading, error } = useBbrFileProcessor();
const { downloadProcessedXml } = useXmlDownloader();

const processReplayFile = async () => {
  if (!bbrFile.value) {
    // show errorText
    document.getElementById("errorText")?.style.setProperty("display", "block");
    // apply the error shake animation to errorText
    document
      .getElementById("errorText")
      ?.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(-5px)" },
          { transform: "translateX(5px)" },
          { transform: "translateX(0)" },
        ],
        {
          duration: 250,
          iterations: 1,
        }
      );
    return;
  }

  try {
    const processedXML = await processFile(bbrFile.value);
    processedReplay.value = processedXML;
    loaded.value = true;
  } catch (error) {
    console.error("Error processing file:", error);
    // Error is already handled by the composable
  }
};

const downloadProcessedReplayFile = () => {
  if (!processedReplay.value) return;
  downloadProcessedXml(processedReplay.value);
};

const clearError = () => {
  error.value = null;
};

const reset = () => {
  bbrFile.value = undefined;
  loaded.value = false;
  processedReplay.value = new DOMParser().parseFromString("", "text/xml");
  clearError();
};
</script>

<style scoped>
</style>
