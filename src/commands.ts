import { isNull } from 'option-t/lib/Nullable/Nullable';
import { isUndefined } from 'option-t/lib/Undefinable/Undefinable';
import { window as vscodeWindow, workspace as vscodeWorkspace } from 'vscode';
import { createExtractor } from './extractor';
import { Formatter } from './formatter';
import { SupportFileType } from './supportFileType';

const supportedFormats = Object.entries(SupportFileType).map(
  ([_id, value]) => value,
);

export async function runCSSExtractor(): Promise<void> {
  const editor = vscodeWindow.activeTextEditor;

  const extractor = createExtractor();
  const formatter = new Formatter();

  if (isUndefined(editor) || isNull(extractor) || isNull(formatter)) {
    return;
  }

  const { document } = editor;
  const content = document.getText();
  const { languageId } = document;

  const isSupportedLanguage =
    supportedFormats.filter((format) => format === languageId).length > 0;
  if (!isSupportedLanguage) {
    vscodeWindow.showErrorMessage('eCSStractor: not supported format.');
    return;
  }

  extractor.setFileType(languageId as SupportFileType);

  const selectors = [
    ...extractor.extractId(content),
    ...extractor.extractClassName(content),
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
