export function xmlToJson(xmlString: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const jsonResult = {};

    function processNode(node: ChildNode, obj: any) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const nodeName = node.nodeName;
            const childObj = node.hasChildNodes() ? {} : null;
            if (node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE) {
                obj[nodeName] = node.firstChild.nodeValue;
            } else {
                node.childNodes.forEach(childNode => processNode(childNode, childObj));
                obj[nodeName] = childObj;
            }
        }
    }

    xmlDoc.childNodes.forEach(childNode => processNode(childNode, jsonResult));
    return jsonResult;
}
