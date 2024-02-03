import { recursiveBase64Decode } from "./recursiveBase64Decode";

export function processMessageData(text: string): string {
    const decodedHtml = decodeURIComponent(text);
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(`<root>${decodedHtml}</root>`, "text/xml");
        xmlDoc.querySelectorAll("*").forEach(subElem => {
            if (subElem.textContent) {
                subElem.textContent = recursiveBase64Decode(subElem.textContent);
            }
        });
        return new XMLSerializer().serializeToString(xmlDoc.documentElement).slice(6, -7); // Remove <root> and </root>
    } catch (e) {
        return decodedHtml;
    }
}