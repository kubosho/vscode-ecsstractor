import { SupportFileType } from './supportFileType';
import { Extractor } from './extractor';
import { HtmlExtractor } from './html_extractor';
import { JsxExtractor } from './jsx_extractor';

class ExtractorImpl implements Extractor {
  private _htmlExtractor: HtmlExtractor;
  private _jsxExtractor: JsxExtractor;

  private _filetype: SupportFileType | null;

  constructor() {
    this._htmlExtractor = new HtmlExtractor();
    this._jsxExtractor = new JsxExtractor();
    this._filetype = null;
  }

  extractClassName(contents: string): string[] {
    if (this._filetype === SupportFileType.Html) {
      return this._htmlExtractor.extractClassName(contents);
    }

    return this._jsxExtractor.extractClassName(contents);
  }

  extractId(contents: string): string[] {
    if (this._filetype === SupportFileType.Html) {
      return this._htmlExtractor.extractId(contents);
    }

    return this._jsxExtractor.extractId(contents);
  }

  setFileType(fileType: SupportFileType): void {
    this._filetype = fileType;
  }
}

export function createExtractor() {
  return new ExtractorImpl();
}
