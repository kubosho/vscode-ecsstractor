import { Literal } from 'estree';
import {
  JSXAttribute,
  JSXExpressionContainer,
} from '../typings/esprima_extend';

export function isLiteral(
  value: Literal | JSXExpressionContainer,
): value is Literal {
  return value.type === 'Literal';
}

export function isClassName(attr: JSXAttribute): boolean {
  return attr.name.name === 'className' || attr.name.name === 'class';
}

export function isId(attr: JSXAttribute): boolean {
  return attr.name.name === 'id';
}
