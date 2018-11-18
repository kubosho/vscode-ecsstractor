import { runCSSExtractor } from './src/commands'

export function activate(context) {
  context.subscriptions.push(runCSSExtractor())
}

export function deactivate() {
}
