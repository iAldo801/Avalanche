const Discord = require('discord.js');
const client = require("../index.js");
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

client.on('voiceStateUpdate', async (oldMember, newMember) => {
    if (oldMember.channel === null && newMember.channel) {
        const joinEmbed = new Discord.EmbedBuilder()
            .setTitle(embeds.voice.join.title)
            .setDescription(embeds.voice.join.description.replace('{channel}', newMember.channel.id).replace('{user}', newMember.member.user.id).replace('{time}', new Date().toLocaleString()))
            .setThumbnail(newMember.member.displayAvatarURL({ dynamic: true }))
            .setColor(embeds.voice.join.color)
            .setTimestamp();
        client.channels.cache.get(commands.channels.logs).send({ embeds: [joinEmbed] });
    }

    else if (oldMember.channel && newMember.channel === null) {
        const leaveEmbed = new Discord.EmbedBuilder()
            .setTitle(embeds.voice.leave.title)
            .setDescription(embeds.voice.leave.description.replace('{channel}', oldMember.channel.id).replace('{user}', oldMember.member.user.id).replace('{time}', new Date().toLocaleString()))
            .setThumbnail(newMember.member.displayAvatarURL({ dynamic: true }))
            .setColor(embeds.voice.leave.color)
            .setTimestamp();

        client.channels.cache.get(commands.channels.logs).send({ embeds: [leaveEmbed] });
    }
});
