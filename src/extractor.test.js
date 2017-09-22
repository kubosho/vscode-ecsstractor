const test = require('ava')
const Extractor = require('./extractor')

const extractor = new Extractor()

test(async t => {
    const actual = await extractor.extractClassNames(`${process.cwd()}/testcases/list.html`)

    t.is(actual.length, 6)
    t.is(actual[0], 'list')
    t.is(actual[1], 'list-item')
})
