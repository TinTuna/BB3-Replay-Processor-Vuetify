import { decodeBase64 } from './decodeBase64';
import { isBase64 } from './isBase64';
import { decodeHtml } from './decodeHtml';

export const processXML = async (xmlString: string): Promise<Document> => {
    return new Promise((resolve, reject) => {
        try {
            const encodedTags = ['Name', 'CreatorGamerId', 'MatchId', 'Logo', 'Id', 'PartsItem', 'LobbyId', 'MessageData', 'Ball', 'GrandStand', 'Pitch'];
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");
            
            xmlDoc.querySelectorAll("*").forEach(elem => {
                if (encodedTags.includes(elem.tagName) && elem.textContent) {
                    if(isBase64(elem.textContent)) {
                        elem.textContent = decodeBase64(elem.textContent);
                    }
                }
                if (elem.tagName === 'MessageData' && elem.textContent) {
                    if(isBase64(elem.textContent)) {
                        elem.textContent = decodeBase64(elem.textContent);
                    }
                }
            });
            xmlDoc.querySelectorAll("*").forEach(elem => {
                if (elem.tagName === 'MessageData' && elem.textContent) {
                    elem.textContent = decodeHtml(elem.textContent);
                }
            });
            resolve(xmlDoc);
            // const serialisedtoString = new XMLSerializer().serializeToString(xmlDoc);
            // // const decodedHtml = decodeHtml(serialisedtoString);
            // resolve(serialisedtoString);
        } catch (error) {
            reject(error);
        }
    });
}
