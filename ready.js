const client = require("./index.js");
const commandLoader = require('./loaders/command.js')
const eventLoader = require('./loaders/event.js')

const chalk = require('chalk');
const aqua = chalk.hex('#33FFFE')
const purple = chalk.hex('#5a67d8')

const log = console.log;

client.on("ready", () => {
    log(aqua('│ 🏂 Avalanche Bot ↴'))
    log("")
    log(chalk.green(` │ 💻 Commands Loaded ⤵`))
    commandLoader(client)
    log("")
    eventLoader(client)
})
