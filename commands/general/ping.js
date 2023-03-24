const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))

module.exports = {
    name: 'ping',
    description: 'Pong!',

    run: async (client, interaction, args) => {

        if (!commands.ping.enabled) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(commands.disabled.title)
                .setDescription(commands.disabled.description)
                .setColor(commands.disabled.color)
                .setTimestamp();

            return interaction.reply({ embeds: [embed] }).then(() => {
                
                setTimeout(() => {
                    interaction.deleteReply().catch(console.error);
                }, 5000);
            }).catch(console.error);
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`🏓 Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
            .setColor('Random');

        interaction.reply({ embeds: [embed] });

    }
}