export function xmlToJson(xmlString: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const jsonResult = {};

    function processNode(node: ChildNode, obj: any) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const nodeName = node.nodeName;
            const childObj = node.hasChildNodes() ? {} : null;
            if (node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE) {
                if (obj[nodeName]) {
                    // If the node already exists and is not an array, convert it into an array
                    if (!Array.isArray(obj[nodeName])) {
                        obj[nodeName] = [obj[nodeName]];
                    }
                    // Push the new node value into the array
                    obj[nodeName].push(node.firstChild.nodeValue);
                } else {
                    obj[nodeName] = node.firstChild.nodeValue;
                }
            } else {
                node.childNodes.forEach(childNode => processNode(childNode, childObj));
                if (obj[nodeName]) {
                    // If the node already exists and is not an array, convert it into an array
                    if (!Array.isArray(obj[nodeName])) {
                        obj[nodeName] = [obj[nodeName]];
                    }
                    // Push the new node object into the array
                    obj[nodeName].push(childObj);
                } else {
                    obj[nodeName] = childObj;
                }
            }
        }
    }

    xmlDoc.childNodes.forEach(childNode => processNode(childNode, jsonResult));
    return jsonResult;
}