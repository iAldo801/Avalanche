const Discord = require("discord.js")
const fs = require("fs")
const yaml = require("js-yaml")
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {


    name: "say",
    description: "no se lol",
    options: [
        {
            name: "message",
            description: "the message you want to say",
            required: true,
            type: 3
        }
    ],


    run: async (client, interaction) => {

        if (!commands.say.enabled) {
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

        const text = interaction.options.getString("message")
        interaction.reply(text)
    }
}