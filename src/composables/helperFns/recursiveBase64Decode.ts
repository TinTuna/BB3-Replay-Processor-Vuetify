import { base64DecodedUtf8 } from "./base64DecodedUtf8";
import { isBase64 } from "./isBase64";

export function recursiveBase64Decode(s: string): string {
    if (isBase64(s)) {
        const decoded = base64DecodedUtf8(s);
        return recursiveBase64Decode(decoded);
    } else {
        return s;
    }
}