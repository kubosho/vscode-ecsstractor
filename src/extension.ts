import { ExtensionContext } from 'vscode';
import { runCSSExtractor } from './commands';

export async function activate(context: ExtensionContext) {
  context.subscriptions.push(await runCSSExtractor());
}

export function deactivate() {}
