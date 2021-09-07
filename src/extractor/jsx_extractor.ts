import * as esprima from 'esprima';
import {
  ExportNamedDeclaration,
  Expression,
  FunctionDeclaration,
} from 'estree';
import { isNotNullAndUndefined } from 'option-t/lib/Maybe/Maybe';

import { JSXElement, JSXText } from '../../typings/esprima_extend';
import {
  isClassName,
  isExportNamedDeclaration,
  isFunctionDeclaration,
  isId,
  isJSXElement,
  isReturnStatement,
} from '../utils';

import { Extractor } from './extractor';

export class JsxExtractor implements Extractor {
  private _classNames: string[];
  private _ids: string[];

  constructor() {
    this._classNames = [];
    this._ids = [];
  }

  extractClassName(contents: string): string[] {
    const { body } = esprima.parseModule(contents, { jsx: true });

    const source = getJSXElements([
      ...getFunctionDeclarations(body.filter(isExportNamedDeclaration)),
      ...body.filter(isFunctionDeclaration),
    ]);

    source.forEach((src) => {
      if (isJSXElement(src)) {
        this._extractClassName([src]);
      }
    });

    return this._classNames;
  }

  extractId(contents: string): string[] {
    const { body } = esprima.parseModule(contents, { jsx: true });

    const source = getJSXElements([
      ...getFunctionDeclarations(body.filter(isExportNamedDeclaration)),
      ...body.filter(isFunctionDeclaration),
    ]);

    source.forEach((src) => {
      if (isJSXElement(src)) {
        this._extractId([src]);
      }
    });

    return this._ids;
  }

  private _extractClassName(elements: (JSXElement | JSXText)[]): void {
    getPartialPropertyOfElements(elements).forEach(
      ({ children, openingElement: { attributes } }) => {
        attributes
          .filter(isClassName)
          .map(({ value }) => `${value.value}`.replace(/ /g, '.'))
          .forEach((className) => this._classNames.push(`.${className}`));

        this._extractClassName(children);
      },
    );
  }

  private _extractId(elements: (JSXElement | JSXText)[]): void {
    getPartialPropertyOfElements(elements).forEach(
      ({ children, openingElement: { attributes } }) => {
        attributes
          .filter(isId)
          .forEach((attr) => this._ids.push(`#${attr.value.value}`));

        this._extractId(children);
      },
    );
  }
}

function getFunctionDeclarations(
  sources: ExportNamedDeclaration[],
): FunctionDeclaration[] {
  return sources
    .map(({ declaration }) => declaration)
    .filter(isFunctionDeclaration);
}

function getJSXElements(source: FunctionDeclaration[]): Expression[] {
  return source
    .map(({ body: blockStatement }) => blockStatement)
    .flatMap(({ body }) => body)
    .filter(isReturnStatement)
    .map((returnStatement) => returnStatement.argument)
    .filter(isNotNullAndUndefined);
}

function getPartialPropertyOfElements(
  elements: (JSXElement | JSXText)[],
): Pick<JSXElement, 'children' | 'openingElement'>[] {
  return elements
    .filter((element): element is JSXElement => isJSXElement(element))
    .map(({ children, openingElement }) => {
      return { children, openingElement };
    });
}
