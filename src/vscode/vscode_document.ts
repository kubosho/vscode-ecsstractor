import { TextDocument, window as vscodeWindow } from 'vscode';
import { SupportFileType } from '../extractor/supportFileType';

export class VSCodeDocument {
  private _document: TextDocument | null;

  constructor() {
    this._document = null;

    this._setActiveDocument();
  }

  getActiveDocument(): TextDocument | void {
    if (this._document === null) {
      vscodeWindow.showErrorMessage(
        'eCSStractor: VSCode active document is null.',
      );
      return;
    }

    return this._document;
  }

  getLanguageId(): SupportFileType | void {
    if (this._document === null) {
      vscodeWindow.showErrorMessage(
        'eCSStractor: VSCode active document is null.',
      );
      return;
    }

    const { languageId } = this._document;
    const isSupportedLanguage =
      this._supportedFormats.filter((format) => format === languageId).length >
      0;

    if (!isSupportedLanguage) {
      vscodeWindow.showErrorMessage('eCSStractor: not supported format.');
      return;
    }

    return languageId as SupportFileType;
  }

  private get _supportedFormats(): SupportFileType[] {
    return Object.entries(SupportFileType).map(([_id, value]) => value);
  }

  private _setActiveDocument(): void {
    const { activeTextEditor } = vscodeWindow;
    if (!activeTextEditor) {
      return;
    }

    const { document } = activeTextEditor;
    this._document = document;
  }
}
