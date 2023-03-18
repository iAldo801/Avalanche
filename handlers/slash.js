const client = require("../index.js");
const fs = require('fs');
const path = require('path');
const dirCommands = fs.readdirSync(path.join(__dirname, "../commands"))

for (const subFolder of dirCommands) {
    const filesCommands = fs.readdirSync(path.join(__dirname, "../commands", subFolder))
  
    for (const fileCommand of filesCommands) {
      const command = require(path.join(__dirname, "../commands", subFolder, fileCommand))
      client.slash.set(command.name, command)
    }

    console.log(`Loaded ${filesCommands.length} commands from ${subFolder} folder`)
}