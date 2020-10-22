const symbols = require("log-symbols")
const chalk = require("chalk")

module.exports = {
    error(message, exit = true) {
        message = message.replace(/\{(.+)\}/g, (_, $1) => chalk.redBright($1))
        console.log(symbols.error + " " + message)
        if (exit) process.exit()
    },
    success(message) {
        message = message.replace(/\{(.+)\}/g, (_, $1) => chalk.yellowBright($1))
        console.log(symbols.success + " " + message)
    }
}
