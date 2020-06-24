import { Parser as HtmlParser } from 'htmlparser2';
import { Handler } from 'htmlparser2/lib/Parser';

function createParser(callbacks: Partial<Handler>) {
  return new HtmlParser(callbacks, { decodeEntities: true });
}

export class Extractor {
  extractClassSelectors(content: string): Array<string> {
    const selectors: Array<string> = [];

    const parser = createParser({
      onopentag: (_name, attrs) => {
        if (!(attrs && attrs.class)) {
          return;
        }
        const className = attrs.class.replace(/ /g, '.');
        selectors.push(`.${className}`);
      },
    });
    parser.write(content);
    parser.end();

    return selectors;
  }

  extractIDSelectors(content: string): Array<string> {
    const selectors: Array<string> = [];

    const parser = createParser({
      onopentag: (_name, attrs) => {
        if (!(attrs && attrs.id)) {
          return;
        }
        selectors.push(`#${attrs.id}`);
      },
    });
    parser.write(content);
    parser.end();

    return selectors;
  }
}
