class Formatter {
  removeDuplicatesSelector(selectors) {
    return [...new Set(selectors)]
  }

  mapBrackets(selectors) {
    return selectors.map(selector => `${selector} {}`)
  }
}

module.exports = Formatter
