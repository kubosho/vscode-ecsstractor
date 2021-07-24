import { SimpleLiteral } from 'estree';

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

export type JSXAttribute = {
  type: 'JSXAttribute';
  name: JSXIdentifier;
  value: SimpleLiteral;
};

export type JSXElement = {
  type: 'JSXElement';
  openingElement: JSXOpeningElement;
  children: JSXElement[];
  closingElement: JSXClosingElement | null;
};
