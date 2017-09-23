const prettier = require('prettier')

class Formatter {
  removeDuplicatesSelector(selectors) {
    return [...new Set(selectors)]
  }

  convertSelectorsToRulesets(selectors) {
    return selectors.map(selector => `${selector}{}`).join(' ')
  }

  format(source) {
    return prettier.format(source, { parser: 'postcss' })
  }
}

module.exports = Formatter
