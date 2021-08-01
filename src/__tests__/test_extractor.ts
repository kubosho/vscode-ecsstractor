import test from 'ava';
import { readFile as lagacyReadFile } from 'fs';
import { promisify } from 'util';
import { createExtractor } from '../extractor';
import { SupportFileType } from '../supportFileType';

const readFile = promisify(lagacyReadFile);

test('HTML: extract class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/list.html`,
    'utf8',
  );
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Html);

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 6);
  t.is(actual[0], '.list');
  t.is(actual[1], '.list-item');
});

test('HTML: extract multiple class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/multiple-classes.html`,
    'utf8',
  );
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Html);

  const actual = extractor.extractClassName(content);

  t.is(actual.length, 3);
  t.is(actual[0], '.container.container-fluid.article');
  t.is(actual[1], '.article.content');
  t.is(actual[2], '.article.title');
});

test('HTML: extract id selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/id.html`,
    'utf8',
  );
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Html);

  const actual = extractor.extractId(content);

  t.is(actual.length, 3);
  t.is(actual[0], '#global-header');
  t.is(actual[1], '#global-footer');
  t.is(actual[2], '#site-title');
});

test('JSX: extract class selectors', async (t) => {
  const content = await readFile(
    `${process.cwd()}/testcases/jsx/list.jsx`,
    'utf8',
  );
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Jsx);

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
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Jsx);

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
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Jsx);

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
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Jsx);

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
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Jsx);

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
  const extractor = createExtractor();
  extractor.setFileType(SupportFileType.Jsx);

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
