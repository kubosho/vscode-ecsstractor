import { Nullable, isNull } from 'option-t/lib/Nullable/Nullable';
import { isUndefined } from 'option-t/lib/Undefinable/Undefinable';
import { window as vscodeWindow, workspace as vscodeWorkspace } from 'vscode';
import { Extractor } from './extractor';
import { Formatter } from './formatter';

let extractor: Nullable<Extractor> = new Extractor();
let formatter: Nullable<Formatter> = new Formatter();

const supportedFormats = ['html'];

export async function runCSSExtractor(): Promise<{ dispose: () => void }> {
  const editor = vscodeWindow.activeTextEditor;
  if (isUndefined(editor) || isNull(extractor) || isNull(formatter)) {
    return { dispose };
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

  return {
    dispose,
  };
}

function dispose(): void {
  extractor = null;
  formatter = null;
}
