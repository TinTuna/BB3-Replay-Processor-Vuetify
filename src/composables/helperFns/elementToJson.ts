export function elementToJson(element: Element): any {
  const obj: any = {};

  // Handle attributes
  if (element.hasAttributes()) {
    obj.attributes = {};
    const attributes = Array.from(element.attributes);
    for (const attr of attributes) {
      obj.attributes[attr.name] = attr.value;
    }
  }

  // Process child elements
  if (element.childElementCount > 0) {
    const children = Array.from(element.children);
    for (const child of children) {
      const tagName = child.tagName;
      // If the tag already exists, make it an array or add to it
      if (Object.hasOwn(obj, tagName)) {
        if (!Array.isArray(obj[tagName])) {
          obj[tagName] = [obj[tagName]];
        }
        obj[tagName].push(elementToJson(child));
      } else {
        obj[tagName] = elementToJson(child);
      }
    }
  } else if (
    element.textContent &&
    element.textContent.trim() !== "" &&
    !element.hasAttributes()
  ) {
    return element.textContent.trim();
  } else if (element.textContent) {
    obj.text = element.textContent.trim();
  }

  return obj;
}
