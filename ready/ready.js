const client = require("../index.js");
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;
const orange = chalk.hex('FFA500')
const eventsPath = path.join(__dirname, '../events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const mongo = require('mongoose');

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const dirCommands = fs.readdirSync(path.join(__dirname, "../commands"));
let filesCommands = [];
let command;

for (const subFolder of dirCommands) {
    filesCommands = fs.readdirSync(path.join(__dirname, "../commands", subFolder));
    for (const fileCommand of filesCommands) {
        command = require(path.join(__dirname, "../commands", subFolder, fileCommand));
        client.slash.set(command.name, command);
    }
}

mongo.set('strictQuery', true);
mongo.connect('mongodb://127.0.0.1:27017/campfire')

client.on("ready", () => {
    log(orange('│ 🔥 Campfire Bot ↴'))
    log("")
    log(chalk.green(` │ Commands Loaded ⤵`))
    log('  ' + filesCommands.length + chalk.blue(` commands have been loaded from ` + dirCommands.length + ` folders`))
    log("")
    log(chalk.green(` │ Events Loaded ⤵`))
    log('  ' + eventFiles.length + chalk.blue(` events have been loaded`))
    log("")
    log(chalk.green(` │ Mongo Status ⤵`))
    mongo.connect('mongodb://127.0.0.1:27017/campfire').then(() => {
        log(chalk.yellow(`  Connection to database has been succesfully established`))
    }).catch((err) => {
        log(chalk.red(`  Connection to database has failed`))
        log(err)
    });
})