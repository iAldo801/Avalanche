const Discord = require('discord.js');
const client = new Discord.Client({ intents: 3276799, partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER", "GUILD_MESSAGES"], components: true });

client.slash = new Discord.Collection();
module.exports = client;

["events"].forEach(handler => {
  require(`./ready/ready`)
});

client.login('OTcyMzQ2NTg4MjU5MzE1NzIy.GistuK.aGGyBGfbgSOHHuSvSo1xpsKQJD_j5e_pN7H-ns');

module.exports = client;