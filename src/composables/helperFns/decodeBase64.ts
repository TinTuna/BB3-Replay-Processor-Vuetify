export function decodeBase64(base64String: string): string {
    try {
        // Decode base64 string to a binary string
        const binaryString = atob(base64String);

        // Convert binary string to Uint8Array
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Decode UTF-8 text from Uint8Array
        const decoder = new TextDecoder('utf-8');
        const decodedText = decoder.decode(bytes);

        return decodedText;
    } catch (error) {
        console.error('Error decoding base64 string', error);
        return '';
    }
}
