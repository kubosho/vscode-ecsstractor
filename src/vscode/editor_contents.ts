import { TextDocument, window, workspace } from 'vscode';

export class EditorContents {
  private _contents: string | null;
  private _document: TextDocument;

  constructor({ document }: { document: TextDocument }) {
    this._contents = null;
    this._document = document;
  }

  get contents(): string {
    if (this._contents === null) {
      return '';
    }

    return this._contents;
  }

  import(): void {
    this._contents = this._document.getText();
  }

  async export({
    contents,
    language,
  }: {
    contents: string;
    language?: string;
  }): Promise<void> {
    window.showTextDocument(
      await workspace.openTextDocument({
        content: contents,
        language,
      }),
    );
  }
}
