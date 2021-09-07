import { Element, Node, isTag } from 'domhandler';
import * as esprima from 'esprima';
import {
  ExportNamedDeclaration,
  Expression,
  FunctionDeclaration,
} from 'estree';
import { parseDocument } from 'htmlparser2';
import { isNotNullAndUndefined } from 'option-t/lib/Maybe/Maybe';
import { JSXElement, JSXText } from '../typings/esprima_extend';
import { SupportFileType } from './supportFileType';
import {
  isClassName,
  isExportNamedDeclaration,
  isFunctionDeclaration,
  isId,
  isJSXElement,
  isReturnStatement,
} from './utils';

export interface Extractor {
  extractClassName(contents: string): string[];
  extractId(contents: string): string[];
}

class ExtractorImpl implements Extractor {
  private _classNames: string[];
  private _ids: string[];
  private _filetype: SupportFileType;

  constructor(fileType: SupportFileType) {
    this._classNames = [];
    this._ids = [];
    this._filetype = fileType;
  }

  extractClassName(contents: string): string[] {
    if (this._filetype === SupportFileType.Html) {
      const root = parseDocument(contents);
      this._extractClassNameFromHtml(root.children);
    } else {
      const { body } = esprima.parseModule(contents, { jsx: true });

      const source = getJSXElements([
        ...getFunctionDeclarations(body.filter(isExportNamedDeclaration)),
        ...body.filter(isFunctionDeclaration),
      ]);

      source.forEach((src) => {
        if (isJSXElement(src)) {
          this._extractClassNameFromJsx([src]);
        }
      });
    }

    return this._classNames;
  }

  extractId(contents: string): string[] {
    if (this._filetype === SupportFileType.Html) {
      const root = parseDocument(contents);
      this._extractIdFromHtml(root.children);
    } else {
      const { body } = esprima.parseModule(contents, { jsx: true });

      const source = getJSXElements([
        ...getFunctionDeclarations(body.filter(isExportNamedDeclaration)),
        ...body.filter(isFunctionDeclaration),
      ]);

      source.forEach((src) => {
        if (isJSXElement(src)) {
          this._extractIdFromJsx([src]);
        }
      });
    }

    return this._ids;
  }

  private _extractClassNameFromHtml(children: Element[] | Node[]): void {
    const elements = children.flatMap((child) => (isTag(child) ? [child] : []));
    if (elements.length === 0) {
      return;
    }

    const classNames = getClassNames(elements);
    this._classNames = this._classNames.concat(classNames);

    this._extractClassNameFromHtml(
      elements.flatMap((element) => element.children),
    );
  }

  private _extractClassNameFromJsx(elements: (JSXElement | JSXText)[]): void {
    getPartialPropertyOfElements(elements).forEach(
      ({ children, openingElement: { attributes } }) => {
        attributes
          .filter(isClassName)
          .map(({ value }) => `${value.value}`.replace(/ /g, '.'))
          .forEach((className) => this._classNames.push(`.${className}`));

        this._extractClassNameFromJsx(children);
      },
    );
  }

  private _extractIdFromHtml(children: Element[] | Node[]): void {
    const elements = children.flatMap((child) => (isTag(child) ? [child] : []));
    if (elements.length === 0) {
      return;
    }

    const ids = getIds(elements);
    this._ids = this._ids.concat(ids);

    this._extractIdFromHtml(elements.flatMap((element) => element.children));
  }

  private _extractIdFromJsx(elements: (JSXElement | JSXText)[]): void {
    getPartialPropertyOfElements(elements).forEach(
      ({ children, openingElement: { attributes } }) => {
        attributes
          .filter(isId)
          .forEach((attr) => this._ids.push(`#${attr.value.value}`));

        this._extractIdFromJsx(children);
      },
    );
  }
}

export function createExtractor(fileType: SupportFileType) {
  return new ExtractorImpl(fileType);
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
