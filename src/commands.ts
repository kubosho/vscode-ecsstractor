import { isUndefined } from 'option-t/lib/Undefinable/Undefinable';
import { window as vscodeWindow, workspace as vscodeWorkspace } from 'vscode';
import { Extractor } from './extractor';
import { Formatter } from './formatter';

const extractor = new Extractor();
const formatter = new Formatter();

const supportedFormats = ['html'];

export async function runCSSExtractor(): Promise<void> {
  const editor = vscodeWindow.activeTextEditor;
  if (isUndefined(editor)) {
    return;
  }

  const document = editor.document;
  const content = document.getText();

  const isSupportedLanguage = supportedFormats.includes(document.languageId);
  if (!isSupportedLanguage) {
    vscodeWindow.showErrorMessage('eCSStractor: not supported format.');
  }

  const selectors = [
    ...extractor.extractIDSelectors(content),
    ...extractor.extractClassSelectors(content),
  ];

  const source = formatter.convertSelectorsToRulesets(
    formatter.removeDuplicatesSelector(selectors),
  );

  vscodeWindow.showTextDocument(
    await vscodeWorkspace.openTextDocument({
      content: formatter.format(source),
      language: 'css',
    }),
  );
}
