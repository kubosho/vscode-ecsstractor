import { window as vscodeWindow, workspace as vscodeWorkspace } from 'vscode';
import { getActiveDocument } from './document';
import { createExtractor } from './extractor';
import { format } from './formatter';
import { SupportFileType } from './supportFileType';

const supportedFormats = Object.entries(SupportFileType).map(
  ([_id, value]) => value,
);

export async function runCSSExtractor(): Promise<void> {
  const document = getActiveDocument();
  if (!document) {
    return;
  }

  const { languageId } = document;
  const isSupportedLanguage =
    supportedFormats.filter((format) => format === languageId).length > 0;
  if (!isSupportedLanguage) {
    vscodeWindow.showErrorMessage('eCSStractor: not supported format.');
    return;
  }

  const extractor = createExtractor(languageId as SupportFileType);

  const content = document.getText();
  const selectors = [
    ...extractor.extractId(content),
    ...extractor.extractClassName(content),
  ];

  vscodeWindow.showTextDocument(
    await vscodeWorkspace.openTextDocument({
      content: format(selectors),
      language: 'css',
    }),
  );
}
