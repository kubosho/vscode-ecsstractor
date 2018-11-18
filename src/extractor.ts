import htmlparser from 'htmlparser2'

function createParser(callbacks) {
  return new htmlparser.Parser(callbacks, { decodeEntities: true })
}

export class Extractor {
  extractClassSelectors(content) {
    const selectors = []

    const parser = createParser({
      onopentag: (name, attrs = {}) => {
        if (!(attrs && attrs.class)) return
        const className = attrs.class.replace(/ /g, '.')
        selectors.push(`.${className}`)
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
