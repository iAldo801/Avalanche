const Discord = require("discord.js")
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: "dick",
    description: "What size is yours? 🤔🍆",

    run: async (client, interaction) => {

        if (!commands.dick.enabled) {
            const disabledCommand = new Discord.EmbedBuilder()
                .setTitle(commands.disabled.title)
                .setDescription(commands.disabled.description)
                .setColor(commands.disabled.color)
                .setTimestamp();

            return interaction.reply({ embeds: [disabledCommand] }).then(() => {

                setTimeout(() => {
                    interaction.deleteReply().catch(console.error);
                }, 5000);
            }).catch(console.error);
        }

        const dick = Math.floor(Math.random() * 99) + 1;

        if (interaction.user) {
            const embed = new Discord.EmbedBuilder()
                .setDescription(embeds.dick.description.replace('{dicksize}', dick))
                .setColor(embeds.dick.color)
            interaction.reply(
                { embeds: [embed] }
            )
        }
        
    }
}