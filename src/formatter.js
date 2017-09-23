class Formatter {
  removeDuplicatesSelector(selectors) {
    return [...new Set(selectors)]
  }

  convertSelectorsToRulesets(selectors) {
    return selectors.map(selector => `${selector}{}`).join(' ')
  }
}

module.exports = Formatter
