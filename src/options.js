const path = require("path")
const fs = require("fs")
const util = require("./util")

module.exports = function options(program) {
    program.option(
        "-t, --timeout <time>",
        "Time in milliseconds to wait between every download.",
        input => {
            input = Number(input)
            if (isNaN(input)) util.error(`The {--timeout} option must be a number.`)
            return input
        },
        1500
    )

    program.option(
        "-o, --output <path>",
        "The path where to save the images.",
        checkOutput,
        checkOutput("./output")
    )

    program.helpInformation = () => "help"
}

function checkOutput(input) {
    input = path.resolve(input)
    try {
        fs.accessSync(input)
    } catch {
        try {
            fs.mkdirSync(input)
        } catch {
            util.error(`Could not create {${input}}.`)
        }
    }
    return input
}
