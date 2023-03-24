const Discord = require('discord.js');
const client = require("../index.js");
const fs = require("fs")
const yaml = require("js-yaml");
const { AuditLogEvent } = require('discord.js');
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))


client.on('messageUpdate', async (oldMessage, newMessage) => {

    if (oldMessage.content === newMessage.content) return;

    const embed = new Discord.EmbedBuilder()
        .setTitle(embeds.message.updated.title)
        .setDescription(embeds.message.updated.description.replace('{oldMessageAuthor}', oldMessage.author).replace('{oldMessageChannel}', oldMessage.channel))
        .addFields(
            { name: embeds.message.updated.fields.one.name, value: embeds.message.updated.fields.one.value.replace('{oldMessageContent}', oldMessage.content) },
            { name: embeds.message.updated.fields.two.name, value: embeds.message.updated.fields.two.value.replace('{newMessageContent}', newMessage.content) }
        )
        .setColor(embeds.message.updated.color)
        .setTimestamp();

    client.channels.cache.get(commands.channels.logs).send({ embeds: [embed] });

});

client.on('messageDelete', async (message) => {


    const embed = new Discord.EmbedBuilder()
        .setTitle(embeds.message.deleted.title)
        .setDescription(embeds.message.deleted.description.replace('{author}', message.author).replace('{channel}', message.channel))
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: embeds.message.deleted.fields.one.name, value: embeds.message.deleted.fields.one.value.replace('{deleted_message}', message.content) },
        )
        .setColor(embeds.message.deleted.color)
        .setTimestamp();

    if (message.author.bot) return;

    client.channels.cache.get(commands.channels.logs).send({ embeds: [embed] });

});