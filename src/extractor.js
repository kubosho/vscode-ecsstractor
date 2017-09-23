const fs = require('fs')
const util = require('util')
const htmlparser = require('htmlparser2')

function createParser(callbacks) {
  return new htmlparser.Parser(callbacks, { decodeEntities: true })
}

class Extractor {
  async extractFileContent(path) {
    let content = ''

    try {
      const readFile = util.promisify(fs.readFile)
      content = await readFile(path, 'utf8')
    } catch (error) {
      throw new Error(error)
    }

    return content
  }

  extractClassSelectors(content) {
    const selectors = []

    const parser = createParser({
      onopentag: (name, attrs = {}) => {
        if (!(attrs && attrs.class)) return
        selectors.push(`.${attrs.class}`)
      },
    })
    parser.write(content)
    parser.end()

    return selectors
  }

  extractIDSelectors(content) {
    const selectors = []

    const parser = createParser({
      onopentag: (name, attrs = {}) => {
        if (!(attrs && attrs.id)) return
        selectors.push(`#${attrs.id}`)
      },
    })
    parser.write(content)
    parser.end()

    return selectors
  }
}

module.exports = Extractor
