import { SupportFileType } from './supportFileType';

export interface Extractor {
  extractClassName(contents: string): string[];
  extractId(contents: string): string[];
  setFileType?(fileType: SupportFileType): void;
}
