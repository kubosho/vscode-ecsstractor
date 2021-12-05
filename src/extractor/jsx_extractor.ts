import { parse, simpleTraverse } from '@typescript-eslint/typescript-estree';

import {
  JSXAttribute,
  JSXElement,
  JSXExpressionContainer,
  Literal,
  ObjectExpression,
  Property,
} from '../types/ast_types';

import { Extractor } from './extractor';

export class JsxExtractor implements Extractor {
  extractClassName(contents: string): string[] {
    const result: string[] = [];

    const ast = parse(contents, { jsx: true });
    simpleTraverse(ast, {
      enter: (node) => {
        if (node.type === 'JSXElement') {
          result.push(...this._extractClassNameFromJSXElement(node));
        }

        if (node.type === 'JSXExpressionContainer') {
          result.push(
            ...this._extractClassNameFromJSXExpressionContainer(node),
          );
        }
      },
    });

    return result;
  }

  extractId(contents: string): string[] {
    const result: string[] = [];
    const ast = parse(contents, { jsx: true });

    simpleTraverse(ast, {
      enter: (node) => {
        if (node.type === 'JSXElement') {
          result.push(...this._extractId(node));
        }
      },
    });

    return result;
  }

  private _extractClassNameFromJSXElement(element: JSXElement): string[] {
    const { openingElement } = element;
    const { attributes } = openingElement;

    return attributes
      .filter(
        (attr): attr is JSXAttribute =>
          attr.type === 'JSXAttribute' && attr.name.name === 'className',
      )
      .flatMap(({ value }) => {
        if (value?.type !== 'Literal' || typeof value.value !== 'string') {
          return [];
        }

        return `.${value.value.replace(/ /g, '.')}`;
      });
  }

  private _extractClassNameFromJSXExpressionContainer({
    expression,
  }: JSXExpressionContainer): string[] {
    if (
      expression.type !== 'CallExpression' ||
      !expression.callee ||
      expression.callee.type !== 'Identifier' ||
      expression.callee.name !== 'classNames'
    ) {
      return [];
    }

    const result1 = expression.arguments
      .filter((value): value is Literal => value.type === 'Literal')
      .map(({ value }) => `.${value}`);

    const result2 = expression.arguments
      .filter(
        (value): value is ObjectExpression => value.type === 'ObjectExpression',
      )
      .flatMap(({ properties }) => properties)
      .filter((property): property is Property => property.type === 'Property')
      .flatMap((property) =>
        property.key.type === 'Literal' ? `.${property.key.value}` : [],
      );

    return [...result1, ...result2];
  }

  private _extractId(element: JSXElement): string[] {
    const { openingElement } = element;
    const { attributes } = openingElement;

    return attributes
      .filter(
        (attr): attr is JSXAttribute =>
          attr.type === 'JSXAttribute' && attr.name.name === 'id',
      )
      .flatMap(({ value }) => {
        if (value?.type !== 'Literal') {
          return [];
        }

        return `#${value.value}`;
      });
  }
}
