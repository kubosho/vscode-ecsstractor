import { CallExpression, Literal } from 'estree';

type JSXIdentifier = { name: string; type: 'JSXIdentifier' };

type JSXOpeningElement = {
  type: 'JSXOpeningElement';
  name: JSXIdentifier;
  selfClosing: boolean;
  attributes: JSXAttribute[];
};

type JSXClosingElement = {
  type: 'JSXClosingElement';
  name: JSXIdentifier;
};

type JSXExpressionContainer = {
  type: 'JSXExpressionContainer';
  expression: CallExpression;
};

export type JSXAttribute = {
  type: 'JSXAttribute';
  name: JSXIdentifier;
  value: Literal | JSXExpressionContainer;
};

export type JSXElement = {
  type: 'JSXElement';
  openingElement: JSXOpeningElement;
  children: JSXElement[];
  closingElement: JSXClosingElement | null;
};

export type JSXText = {
  type: 'JSXText';
  value: string;
  raw: string;
};
