export function isBase64(str: string): boolean {
    const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    
    if (!str || str.length === 0 || !base64Pattern.test(str)) {
        return false;
    }
    
    try {
        atob(str);
        return true;
    } catch (e) {
        return false;
    }
}
