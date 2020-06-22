import { ExtensionContext } from 'vscode';
import { runCSSExtractor } from './commands';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(runCSSExtractor());
}

export function deactivate() {}
