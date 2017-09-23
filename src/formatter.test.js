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

test('mapping brackets', t => {
  const selectors = [
    '.container.container-fluid',
    '.article.content',
    '.article.title',
  ]
  const actual = formatter.mapBrackets(selectors)

  t.is(actual[0], '.container.container-fluid {}')
  t.is(actual[1], '.article.content {}')
})
