export interface Extractor {
  extractClassName(contents: string): string[];
  extractId(contents: string): string[];
}
