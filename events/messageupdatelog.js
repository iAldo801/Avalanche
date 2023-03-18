const Discord = require('discord.js');
const client = require("../index.js");
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))
const channel = yaml.load(fs.readFileSync("./config/channel.yml", "utf8"))


client.on('messageUpdate', async (oldMessage, newMessage) => {

    if (oldMessage.content === newMessage.content) return;

    const embed = new Discord.EmbedBuilder()
        .setTitle(embeds.messageupdate.title)
        .setDescription(embeds.messageupdate.description.replace('{oldMessageAuthor}', oldMessage.author).replace('{oldMessageChannel}', oldMessage.channel))
        .addFields(
            { name: embeds.messageupdate.fields.one.name, value: embeds.messageupdate.fields.one.value.replace('{oldMessageContent}', oldMessage.content) },
            { name: embeds.messageupdate.fields.two.name, value: embeds.messageupdate.fields.two.value.replace('{newMessageContent}', newMessage.content) }
        )
        .setColor(embeds.messageupdate.color)
        .setTimestamp();

    client.channels.cache.get(channel.messageupdate.channel).send({ embeds: [embed] });

});