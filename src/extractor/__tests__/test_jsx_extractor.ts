import { readFile as lagacyReadFile } from 'fs';
import { promisify } from 'util';

import { JsxExtractor } from '../jsx_extractor';

const readFile = promisify(lagacyReadFile);

test('JSX: extract class selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/list.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(6);
  expect(actual[0]).toBe('.list');
  expect(actual[1]).toBe('.list-item');
});

test('JSX: default export case', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/default-export.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(6);
  expect(actual[0]).toBe('.list');
  expect(actual[1]).toBe('.list-item');
});

test('JSX: export variable case', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/export-with-variable.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(6);
  expect(actual[0]).toBe('.list');
  expect(actual[1]).toBe('.list-item');
});

test('JSX: extract multiple class selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/multiple-classes.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(3);
  expect(actual[0]).toBe('.container.container-fluid.article');
  expect(actual[1]).toBe('.article.content');
  expect(actual[2]).toBe('.article.title');
});

test('JSX: extract id selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/id.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractId(content);

  expect(actual.length).toBe(3);
  expect(actual[0]).toBe('#global-header');
  expect(actual[1]).toBe('#site-title');
  expect(actual[2]).toBe('#global-footer');
});

test('JSX: with hooks', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/with-hooks.jsx`,
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

test('JSX: with classnames library', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/with-classnames.jsx`,
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
