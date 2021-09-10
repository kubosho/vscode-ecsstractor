import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import { Node } from 'estree';

import { JSXElement } from '../../typings/esprima_extend';
import { isClassName, isId, isJSXElement } from '../utils';

import { Extractor } from './extractor';

export class JsxExtractor implements Extractor {
  extractClassName(contents: string): string[] {
    const result: string[] = [];

    const ast = esprima.parseModule(contents, { jsx: true });
    estraverse.traverse(ast, {
      enter: (node: Node | JSXElement) => {
        if (isJSXElement(node)) {
          result.push(...this._extractClassName(node));
        }
      },
      fallback: 'iteration',
    });

    return result;
  }

  extractId(contents: string): string[] {
    const result: string[] = [];
    const ast = esprima.parseModule(contents, { jsx: true });

    estraverse.traverse(ast, {
      enter: (node: Node | JSXElement) => {
        if (isJSXElement(node)) {
          result.push(...this._extractId(node));
        }
      },
      fallback: 'iteration',
    });

    return result;
  }

  private _extractClassName(element: JSXElement): string[] {
    const { openingElement } = element;
    const { attributes } = openingElement;

    return attributes
      .filter(isClassName)
      .map(({ value }) => `${value.value}`.replace(/ /g, '.'))
      .map((className) => `.${className}`);
  }

  private _extractId(element: JSXElement): string[] {
    const { openingElement } = element;
    const { attributes } = openingElement;

    return attributes.filter(isId).map((attr) => `#${attr.value.value}`);
  }
}
