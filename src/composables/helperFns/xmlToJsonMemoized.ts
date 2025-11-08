import { xmlToJson } from "./xmlToJson";

/**
 * Memoized version of xmlToJson that caches parsed results.
 * This dramatically improves performance when the same XML strings are parsed multiple times.
 */
class XmlParseCache {
  private cache: Map<string, any>;
  private maxSize: number;

  constructor(maxSize: number = 10000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  parse(xmlString: string): any {
    // Check cache first
    if (this.cache.has(xmlString)) {
      return this.cache.get(xmlString);
    }

    // Parse and cache
    const result = xmlToJson(xmlString);

    // Prevent memory bloat - clear cache if it gets too large
    if (this.cache.size >= this.maxSize) {
      this.cache.clear();
    }

    this.cache.set(xmlString, result);
    return result;
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
    };
  }
}

// Create a singleton instance for use across the application
export const xmlParseCache = new XmlParseCache();

/**
 * Memoized wrapper around xmlToJson.
 * Use this instead of xmlToJson directly for better performance.
 */
export function xmlToJsonMemoized(xmlString: string): any {
  return xmlParseCache.parse(xmlString);
}
