import { format } from '../formatter';

test('format selectors', () => {
  const selectors = ['.article.content', '.article.title', '.article.title'];
  const actual = format(selectors);
  const expected = `.article.content {
}
.article.title {
}
`;

  expect(actual).toBe(expected);
});
