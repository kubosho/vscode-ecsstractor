import vscode from 'vscode'
import { Extractor } from './extractor'
import { Formatter } from './formatter'

const extractor = new Extractor()
const formatter = new Formatter()

const supportedFormats = ['html']

export async function runCSSExtractor() {
  const editor = vscode.window.activeTextEditor
  const document = editor.document
  const content = document.getText()

  const isSupportedLanguage = supportedFormats.includes(document.languageId)
  if (!isSupportedLanguage) {
    vscode.window.showErrorMessage('eCSStractor: not supported format.')
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
