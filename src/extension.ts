import { runCSSExtractor } from './commands';

export function activate(context) {
  context.subscriptions.push(runCSSExtractor());
}

export function deactivate() {}
