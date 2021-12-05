import { readFile as lagacyReadFile } from 'fs';
import { promisify } from 'util';

import { JsxExtractor } from '../jsx_extractor';

const readFile = promisify(lagacyReadFile);

test('TSX: extract class selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/list.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(6);
  expect(actual[0]).toBe('.list');
  expect(actual[1]).toBe('.list-item');
});

test('TSX: default export case', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/default-export.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(6);
  expect(actual[0]).toBe('.list');
  expect(actual[1]).toBe('.list-item');
});

test('TSX: export variable case', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/export-with-variable.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(6);
  expect(actual[0]).toBe('.list');
  expect(actual[1]).toBe('.list-item');
});

test('TSX: extract multiple class selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/multiple-classes.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(3);
  expect(actual[0]).toBe('.container.container-fluid.article');
  expect(actual[1]).toBe('.article.content');
  expect(actual[2]).toBe('.article.title');
});

test('TSX: extract id selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/id.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractId(content);

  expect(actual.length).toBe(3);
  expect(actual[0]).toBe('#global-header');
  expect(actual[1]).toBe('#site-title');
  expect(actual[2]).toBe('#global-footer');
});

test('TSX: with hooks', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/with-hooks.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  {
    const actual = [
      ...extractor.extractId(content),
      ...extractor.extractClassName(content),
    ];
    expect(actual.length).toBe(2);
    expect(actual[0]).toBe('#container');
    expect(actual[1]).toBe('.container');
  }
});

test('TSX: with classnames library', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/with-classnames.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  {
    const actual = [
      ...extractor.extractId(content),
      ...extractor.extractClassName(content),
    ];
    expect(actual.length).toBe(3);
    expect(actual[0]).toBe('#container');
    expect(actual[1]).toBe('.container');
    expect(actual[2]).toBe('.container--modifier');
  }
});
