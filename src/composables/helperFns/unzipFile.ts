import pako from 'pako';

export const unzipFile = async (inputFile: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // Convert the base64 string to a Uint8Array
            const binaryString = window.atob(inputFile);
            const charArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                charArray[i] = binaryString.charCodeAt(i);
            }

            // Inflate (unzip) the data
            const result = pako.inflate(charArray, { to: 'string' });
            resolve(result);
        } catch (error) {
            reject(`Error during file unzipping: ${error}`);
        }
    });
}
