export function decodeHtml(html: string): string {
    // Create a new textarea element
    const textarea = document.createElement('textarea');
    // Assign the HTML-encoded string to its 'innerHTML'
    textarea.innerHTML = html;
    // The browser will decode the entities, and we can then extract the decoded string
    return textarea.value;
}
