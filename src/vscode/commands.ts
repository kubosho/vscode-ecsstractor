import { createExtractor } from '../extractor';
import { format } from '../formatter';
import { VSCodeDocument } from './vscode_document';
import { EditorContents } from './editor_contents';

export async function runCSSExtractor(): Promise<void> {
  const vscodeDocument = new VSCodeDocument();

  const activeDocument = vscodeDocument.getActiveDocument();
  const languageId = vscodeDocument.getLanguageId();
  if (!(activeDocument && languageId)) {
    return;
  }

  const editorContents = new EditorContents({
    document: activeDocument,
  });

  editorContents.import();

  const extractor = createExtractor();
  extractor.setFileType(languageId);

  const contents = format([
    ...extractor.extractId(editorContents.contents),
    ...extractor.extractClassName(editorContents.contents),
  ]);

  editorContents.export({
    contents,
    language: 'css',
  });
}
