import { ref, type Ref, readonly } from "vue";
import { decodeBase64File } from "./decodeBase64File";
import { unzipFile } from "./unzipFile";
import { processXML } from "./processXML";

export interface BbrFileProcessor {
  processFile: (file: File) => Promise<Document>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
}

export const useBbrFileProcessor = (): BbrFileProcessor => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const processFile = async (file: File): Promise<Document> => {
    if (!file) {
      throw new Error("No file provided");
    }

    isLoading.value = true;
    error.value = null;

    try {
      // Decode the file
      const decoded = await decodeBase64File(file);

      // Unzip the file
      const unzipped = await unzipFile(decoded);

      // Recursive base64 decode on the XML string
      const processedXML = await processXML(unzipped);

      return processedXML;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      error.value = errorMessage;
      console.error("Error processing BBR file:", err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    processFile,
    isLoading: readonly(isLoading),
    error: readonly(error),
  };
};
