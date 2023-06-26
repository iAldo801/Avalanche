const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'iq',
    description: 'Show how smart are you 🤓',

    run: async (client, interaction) => {

        if (!commands.iq.enabled) {
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

        const iq = Math.floor(Math.random() * 100);

        if (interaction.user) {
            const embed = new Discord.EmbedBuilder()
                .setDescription(embeds.iq.description.replace("{iq}", iq))
                .setColor(embeds.iq.color)
            interaction.reply({ embeds: [embed] })
        }
        
    }
}