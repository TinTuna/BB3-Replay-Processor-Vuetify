export function base64DecodedUtf8(s: string): string {
    const raw = atob(s);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    const decoder = new TextDecoder('utf-8');
    return decoder.decode(array);
}