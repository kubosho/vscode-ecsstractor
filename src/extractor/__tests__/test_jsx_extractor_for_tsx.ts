import test from 'ava';
import { readFile as lagacyReadFile } from 'fs';
import { promisify } from 'util';

import { JsxExtractor } from '../jsx_extractor';

const readFile = promisify(lagacyReadFile);

test('TSX: extract class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/list.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('TSX: default export case', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/default-export.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('TSX: export variable case', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/export-with-variable.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('TSX: extract multiple class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/multiple-classes.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 3);
  t.is(actual[0], '.container.container-fluid.article');
  t.is(actual[1], '.article.content');
  t.is(actual[2], '.article.title');
});

test('TSX: extract id selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/tsx/id.tsx`,
    'utf8',
  );
  const extractor = new JsxExtractor();

  const actual = extractor.extractId(content);

  t.is(actual.length, 3);
  t.is(actual[0], '#global-header');
  t.is(actual[1], '#site-title');
  t.is(actual[2], '#global-footer');
});

test('TSX: with hooks', async (t) => {
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
    t.is(actual.length, 2);
    t.is(actual[0], '#container');
    t.is(actual[1], '.container');
  }
});

test('TSX: with classnames library', async (t) => {
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
    t.is(actual.length, 3);
    t.is(actual[0], '#container');
    t.is(actual[1], '.container');
    t.is(actual[2], '.container--modifier');
  }
});
