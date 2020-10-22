#!/usr/bin/env node
const program = require("commander").program
const options = require("./options")
const download = require("./download")

options(program)
program.parse()
setInterval(() => download(program.output), program.timeout)
