import { SupportFileType } from '../supportFileType';
import { Extractor } from './extractor';
import { HtmlExtractor } from './html_extractor';
import { JsxExtractor } from './jsx_extractor';

class ExtractorImpl implements Extractor {
  private _htmlExtractor: HtmlExtractor;
  private _jsxExtractor: JsxExtractor;

  private _filetype: SupportFileType;

  constructor(fileType: SupportFileType) {
    this._htmlExtractor = new HtmlExtractor();
    this._jsxExtractor = new JsxExtractor();

    this._filetype = fileType;
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
}

export function createExtractor(fileType: SupportFileType) {
  return new ExtractorImpl(fileType);
}
