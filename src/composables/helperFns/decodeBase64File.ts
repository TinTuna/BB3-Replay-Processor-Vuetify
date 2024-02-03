export const decodeBase64File = async (inputFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(inputFile);
        fileReader.onload = () => {
          const base64 = fileReader.result;
          if (typeof base64 !== "string") {
            console.error("Error during file decoding: base64 is not a string.");
            reject("Error during file decoding: base64 is not a string.");
            return;
          }
          // Extract the base64 content from the Data URL
          const base64Content = base64.split(',')[1];
          // Decode base64
          try {
            const decodedContent = atob(base64Content);
            // Convert binary string to UTF-8
            const decodedUtf8Content = decodeURIComponent(escape(decodedContent));
            resolve(decodedUtf8Content);
          } catch (error) {
            console.error("Error during base64 decoding:", error);
            reject("Error during base64 decoding.");
          }
        };
        fileReader.onerror = (error) => {
          console.error("Error reading file:", error);
          reject("Error reading file.");
        };
      } catch (error) {
        console.error("Error during file decoding:", error);
        reject("Error during file decoding.");
      }
    });
  }
  