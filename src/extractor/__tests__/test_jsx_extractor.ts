import test from 'ava';
import { readFile as lagacyReadFile } from 'fs';
import { promisify } from 'util';

import { JsxExtractor } from '../jsx_extractor';

const readFile = promisify(lagacyReadFile);

test('JSX: extract class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/list.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('JSX: default export case', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/default-export.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('JSX: export variable case', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/export-with-variable.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('JSX: extract multiple class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/multiple-classes.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 3);
  t.is(actual[0], '.container.container-fluid.article');
  t.is(actual[1], '.article.content');
  t.is(actual[2], '.article.title');
});

test('JSX: extract id selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/id.jsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractId(content);

  t.is(actual.length, 3);
  t.is(actual[0], '#global-header');
  t.is(actual[1], '#site-title');
  t.is(actual[2], '#global-footer');
});

test('JSX: with hooks', async (t) => {
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
    t.is(actual.length, 2);
    t.is(actual[0], '#container');
    t.is(actual[1], '.container');
  }
});

test('JSX: with classnames library', async (t) => {
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
    t.is(actual.length, 3);
    t.is(actual[0], '#container');
    t.is(actual[1], '.container');
    t.is(actual[2], '.container--modifier');
  }
});
