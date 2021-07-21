import test from 'ava';
import { readFile as lagacyReadFile } from 'fs';
import { promisify } from 'util';
import { createExtractor } from '../extractor';

const readFile = promisify(lagacyReadFile);

test('extract class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/list.html`,
    'utf8',
  );
  const extractor = createExtractor();
  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('extract multiple class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/multiple-classes.html`,
    'utf8',
  );
  const extractor = createExtractor();
  const actual = extractor.extractClassName(content);

  t.is(actual.length, 3);
  t.is(actual[0], '.container.container-fluid.article');
  t.is(actual[1], '.article.content');
  t.is(actual[2], '.article.title');
});

test('extract id selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/id.html`,
    'utf8',
  );
  const extractor = createExtractor();
  const actual = extractor.extractId(content);

  t.is(actual.length, 3);
  t.is(actual[0], '#global-header');
  t.is(actual[1], '#global-footer');
  t.is(actual[2], '#site-title');
});
