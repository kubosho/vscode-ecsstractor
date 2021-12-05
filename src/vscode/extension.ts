import { ExtensionContext, commands } from 'vscode';
import { runCSSExtractor } from './commands';

export async function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand(
    'extension.ecsstractor.run',
    async () => {
      await runCSSExtractor();
    },
  );

  context.subscriptions.push(disposable);
}
