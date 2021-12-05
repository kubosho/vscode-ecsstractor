import { readFile as lagacyReadFile } from 'fs';
import { promisify } from 'util';

import { HtmlExtractor } from '../html_extractor';

const readFile = promisify(lagacyReadFile);

test('HTML: extract class selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/list.html`,
    'utf8',
  );
  const extractor = new HtmlExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(6);
  expect(actual[0]).toBe('.list');
  expect(actual[1]).toBe('.list-item');
});

test('HTML: extract multiple class selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/multiple-classes.html`,
    'utf8',
  );
  const extractor = new HtmlExtractor();

  const actual = extractor.extractClassName(content);

  expect(actual.length).toBe(3);
  expect(actual[0]).toBe('.container.container-fluid.article');
  expect(actual[1]).toBe('.article.content');
  expect(actual[2]).toBe('.article.title');
});

test('HTML: extract id selectors', async () => {
  const content = await readFile(
    `${process.cwd()}/testcases/html/id.html`,
    'utf8',
  );
  const extractor = new HtmlExtractor();

  const actual = extractor.extractId(content);

  expect(actual.length).toBe(3);
  expect(actual[0]).toBe('#global-header');
  expect(actual[1]).toBe('#global-footer');
  expect(actual[2]).toBe('#site-title');
});
