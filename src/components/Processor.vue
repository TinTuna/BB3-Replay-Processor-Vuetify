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
              v-if="!bbrFile?.length"
              class="font-weight-bold ma-1"
              style="color: rgb(156, 0, 0); display: none"
              >Select a file to load</v-label
            >
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
import { decodeBase64File } from "@/composables/helperFns/decodeBase64File";
import { unzipFile } from "@/composables/helperFns/unzipFile";
import { processXML } from "@/composables/helperFns/processXML";
import Wrapper from "@/components/Match/Wrapper.vue";
import { decodeHtml } from "@/composables/helperFns/decodeHtml";

const bbrFile = ref<File[]>();

const loading = ref(false);
const loaded = ref(false);

const processedReplay = ref<Document>(
  new DOMParser().parseFromString("", "text/xml")
);

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
  loading.value = true;
  try {
    // Decode the file
    const decoded = await decodeBase64File(bbrFile.value[0]);

    // Unzip the file
    const unzipped = await unzipFile(decoded);

    // Recursive base64 decode on the XML string
    const processedXML = await processXML(unzipped);
    processedReplay.value = processedXML;
    loaded.value = true;
    loading.value = false;

    return processedXML;
  } catch (error) {
    console.error("Error processing file:", error);
    loading.value = false;
    throw error;
  }
};

const downloadProcessedReplayFile = () => {
  if (!processedReplay.value) return;
  const serialisedtoString = new XMLSerializer().serializeToString(
    processedReplay.value
  );
  const decodedHtml = decodeHtml(serialisedtoString);
  const blob = new Blob([decodedHtml], {
    type: "application/octet-stream",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "processed_replay.xml";
  a.click();
  window.URL.revokeObjectURL(url);
};

const reset = () => {
  bbrFile.value = undefined;
  loading.value = false;
  loaded.value = false;
  processedReplay.value = new DOMParser().parseFromString("", "text/xml");
};
</script>

<style scoped>
</style>@/composables/initialisationHelperFns/decodeBase64File@/composables/initialisationHelperFns/unzipFile@/composables/initialisationHelperFns/processXML@/composables/initialisationHelperFns/decodeHtml