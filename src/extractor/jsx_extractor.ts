import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import { Literal, Node, ObjectExpression, Property } from 'estree';

import {
  JSXElement,
  JSXExpressionContainer,
} from '../../typings/esprima_extend';
import { isClassName, isId, isLiteral } from '../utils';

import { Extractor } from './extractor';

export class JsxExtractor implements Extractor {
  extractClassName(contents: string): string[] {
    const result: string[] = [];

    const ast = esprima.parseModule(contents, { jsx: true });
    estraverse.traverse(ast, {
      enter: (node: Node | JSXElement | JSXExpressionContainer) => {
        if (node.type === 'JSXElement') {
          result.push(...this._extractClassNameFromJSXElement(node));
        }

        if (node.type === 'JSXExpressionContainer') {
          result.push(
            ...this._extractClassNameFromJSXExpressionContainer(node),
          );
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
        if (node.type === 'JSXElement') {
          result.push(...this._extractId(node));
        }
      },
      fallback: 'iteration',
    });

    return result;
  }

  private _extractClassNameFromJSXElement(element: JSXElement): string[] {
    const { openingElement } = element;
    const { attributes } = openingElement;

    return attributes.filter(isClassName).flatMap(({ value }) => {
      if (!isLiteral(value) || typeof value.value !== 'string') {
        return [];
      }

      return `.${value.value.replace(/ /g, '.')}`;
    });
  }

  private _extractClassNameFromJSXExpressionContainer({
    expression,
  }: JSXExpressionContainer): string[] {
    if (
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

    return attributes.filter(isId).flatMap((attr) => {
      if (!isLiteral(attr.value)) {
        return [];
      }

      return `#${attr.value.value}`;
    });
  }
}
