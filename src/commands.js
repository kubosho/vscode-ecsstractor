const vscode = require('vscode')
const Extractor = require('./extractor')
const Formatter = require('./formatter')

const extractor = new Extractor()
const formatter = new Formatter()

const supportedFormats = ['html']

async function runCSSTractor() {
  const editor = vscode.window.activeTextEditor
  const document = editor.document
  const content = document.getText()

  if (!supportedFormats.includes(document.languageId)) {
    vscode.window.showErrorMessage('CSS tractor: not supported format.')
  }

  const selectors = [
    ...extractor.extractIDSelectors(content),
    ...extractor.extractClassSelectors(content),
  ]

  const source = formatter.convertSelectorsToRulesets(
    formatter.removeDuplicatesSelector(selectors),
  )

  vscode.window.showTextDocument(
    await vscode.workspace.openTextDocument({
      content: formatter.format(source),
      language: 'css',
    }),
  )
}

module.exports = {
  run: () => vscode.commands.registerCommand(`extension.run`, runCSSTractor),
}
