import { TextDocument, window as vscodeWindow } from 'vscode';

export function getActiveDocument(): TextDocument | void {
  const { activeTextEditor } = vscodeWindow;
  if (!activeTextEditor) {
    return;
  }

  const { document } = activeTextEditor;
  return document;
}
