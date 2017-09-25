const commands = require('./src/commands')

function activate(context) {
  context.subscriptions.push(commands.run())
}
exports.activate = activate

function deactivate() {}
exports.deactivate = deactivate
