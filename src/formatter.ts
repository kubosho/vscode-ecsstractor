import { format as sourceFormat } from 'prettier';

export class Formatter {
  removeDuplicatesSelector(selectors: Array<string>): Array<string> {
    return [...new Set(selectors)];
  }

  convertSelectorsToRulesets(selectors: Array<string>): string {
    return selectors.map((selector) => `${selector}{}`).join(' ');
  }

  format(source: string): string {
    return sourceFormat(source, { parser: 'postcss' });
  }
}
