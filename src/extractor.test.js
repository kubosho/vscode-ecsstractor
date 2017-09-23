const test = require('ava')
const fs = require('fs')
const util = require('util')
const Extractor = require('./extractor')

const extractor = new Extractor()

test('extract file content', async t => {
  const actual = await extractor.extractFileContent(
    `${process.cwd()}/testcases/list.html`,
  )

  t.true(actual.includes('<li class="list-item">Test 1</li>'))
})

test('extract class selectors', async t => {
  const readFile = util.promisify(fs.readFile)
  const content = await readFile(`${process.cwd()}/testcases/list.html`, 'utf8')
  const actual = extractor.extractClassSelectors(content)

  t.is(actual.length, 6)
  t.is(actual[0], '.list')
  t.is(actual[1], '.list-item')
})

test('extract id selectors', async t => {
  const readFile = util.promisify(fs.readFile)
  const content = await readFile(
    `${process.cwd()}/testcases/include-ids.html`,
    'utf8',
  )
  const actual = extractor.extractIDSelectors(content)

  t.is(actual.length, 3)
  t.is(actual[0], '#global-header')
  t.is(actual[1], '#site-title')
  t.is(actual[2], '#global-footer')
})
