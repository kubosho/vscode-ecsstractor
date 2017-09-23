const fs = require('fs')
const util = require('util')
const htmlparser = require('htmlparser2')

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

  extractClassNames(content) {
    const classNames = []

    const parser = new htmlparser.Parser(
      {
        onopentag: (name, attrs = {}) => {
          if (!(attrs && attrs.class)) {
            return
          }

          classNames.push(attrs.class)
        },
      },
      { decodeEntities: true },
    )

    parser.write(content)
    parser.end()

    return classNames
  }
}

module.exports = Extractor
