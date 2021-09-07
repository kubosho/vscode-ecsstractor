import { Element, Node, isTag } from 'domhandler';
import { parseDocument } from 'htmlparser2';

import { Extractor } from './extractor';

export class HtmlExtractor implements Extractor {
  extractClassName(contents: string): string[] {
    const root = parseDocument(contents);
    return this._extractClassName(root.children);
  }

  extractId(contents: string): string[] {
    const root = parseDocument(contents);
    return this._extractId(root.children);
  }

  private _extractClassName(
    children: Element[] | Node[],
    classNamesArg: string[] = [],
  ): string[] {
    const elements = children.flatMap((child) => (isTag(child) ? [child] : []));
    if (elements.length === 0) {
      return classNamesArg;
    }

    const classNames = classNamesArg.concat(getClassNames(elements));

    return this._extractClassName(
      elements.flatMap((element) => element.children),
      classNames,
    );
  }

  private _extractId(
    children: Element[] | Node[],
    idsArg: string[] = [],
  ): string[] {
    const elements = children.flatMap((child) => (isTag(child) ? [child] : []));
    if (elements.length === 0) {
      return idsArg;
    }

    const ids = idsArg.concat(getIds(elements));

    return this._extractId(
      elements.flatMap((element) => element.children),
      ids,
    );
  }
}

function getClassNames(elements: Element[]): string[] {
  const classNames = elements
    .map((child) => child.attribs.class)
    .filter((className) => !!className)
    .map((className) => `.${className.replace(/ /g, '.')}`);

  return classNames;
}

function getIds(elements: Element[]): string[] {
  const ids = elements
    .map((child) => child.attribs.id)
    .filter((id) => !!id)
    .map((id) => `#${id}`);

  return ids;
}
