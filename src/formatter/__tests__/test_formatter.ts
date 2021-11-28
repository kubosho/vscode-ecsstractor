import test from 'ava';
import { format } from '../formatter';

test('format selectors', (t) => {
  const selectors = ['.article.content', '.article.title', '.article.title'];
  const actual = format(selectors);
  const expected = `.article.content {
}
.article.title {
}
`;

  t.is(actual, expected);
});
