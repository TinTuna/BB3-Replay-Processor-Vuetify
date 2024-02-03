export function documentToJson(doc: Document): any {
    function nodeToJson(node: Node): any {
        let obj: any = {};
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;

            // Process attributes
            if (element.attributes) {
                for (let i = 0; i < element.attributes.length; i++) {
                    const attribute = element.attributes.item(i);
                    if (attribute) {
                        obj['@' + attribute.name] = attribute.value;
                    }
                }
            }

            // Process child nodes
            if (element.childNodes && element.childNodes.length > 0) {
                for (let i = 0; i < element.childNodes.length; i++) {
                    const childNode = element.childNodes.item(i);
                    const childObj = nodeToJson(childNode);
                    if (childNode.nodeName in obj) {
                        if (!Array.isArray(obj[childNode.nodeName])) {
                            obj[childNode.nodeName] = [obj[childNode.nodeName]];
                        }
                        obj[childNode.nodeName].push(childObj);
                    } else {
                        obj[childNode.nodeName] = childObj;
                    }
                }
            }
        } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue?.trim()) {
            obj = node.nodeValue.trim();
        }
        return obj;
    }

    return nodeToJson(doc.documentElement);
}
