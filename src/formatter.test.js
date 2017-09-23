const test = require('ava')
const Formatter = require('./formatter')

const formatter = new Formatter()

test('remove duplicates class selectors', t => {
  const selectors = [
    '.container.container-fluid',
    '.article.content',
    '.article.title',
    '.article.content',
    '.article.title',
  ]
  const actual = formatter.removeDuplicatesSelector(selectors)

  t.is(actual.length, 3)
})

test('convert selectors to rulesets', t => {
  const selectors = ['.article.content', '.article.title']
  const actual = formatter.convertSelectorsToRulesets(selectors)

  t.is(actual, '.article.content{} .article.title{}')
})
