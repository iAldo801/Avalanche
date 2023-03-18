const client = require("../index.js");

client.on('ready', () => {
    console.log('Ready!');
    client.application.commands.set(client.slash.map(x => x))
});