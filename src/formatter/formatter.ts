import { format as sourceFormat } from 'prettier';

export function format(selectors: string[]): string {
  const source = convertSelectorsToRulesets(selectors);
  return sourceFormat(source, { parser: 'css' });
}

function convertSelectorsToRulesets(selectors: Array<string>): string {
  const s = removeDuplicatesSelector(selectors);
  return s.map((selector) => `${selector}{}`).join(' ');
}

function removeDuplicatesSelector(selectors: Array<string>): Array<string> {
  return [...new Set(selectors)];
}
