const Discord = require('discord.js');
const client = new Discord.Client({ intents: 3276799, partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"] });
const mongo = require('mongoose');

client.slash = new Discord.Collection();
module.exports = client;

["slash", "events"].forEach(handler => {
    require(`./handlers/${handler}`)
});

client.on('messageCreate', async (message) => {
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        message.channel.send({
            embeds: [new Discord.EmbedBuilder()
                .setDescription(`Hello im campfire bot!\nIm better bot than TRex ;)\n\nMy author is <@!${client.users.cache.get('457245988516528138').id}> `)]
        });
    }
})

mongo.connect('mongodb://127.0.0.1:27017/campfire').then(() => {
    console.log('Connected to database');
})

client.login('OTcyMzQ2NTg4MjU5MzE1NzIy.Gr_Nwe.ZDe3pxrzKSWtzJ5OzGMzdrR1Nrdn7diCMn2BgI');