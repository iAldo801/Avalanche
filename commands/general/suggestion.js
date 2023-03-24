const Discord = require("discord.js")
const fs = require("fs")
const yaml = require("js-yaml")
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))

module.exports = {
    name: "suggestion",
    description: "Suggest System",
    options: [
        {
            name: "suggestion",
            description: "Suggestion",
            type: 1,
        },
        {
            name: "accept",
            description: "Accept a suggestion",
            type: 1,
        },
        {
            name: "deny",
            description: "Deny a suggestion",
            type: 1,
        }
    ],

    run: async (client, interaction, args) => {

        if (!commands.suggestion.enabled) {
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

        const [subCommand] = args

        if (subCommand === "suggestion") {

            const modal = new Discord.ModalBuilder()
                .setCustomId("suggestion")
                .setTitle("Suggestion")
                .setComponents(
                    new Discord.ActionRowBuilder()
                        .setComponents(
                            new Discord.TextInputBuilder()
                                .setLabel("Suggestion")
                                .setCustomId("suggestion")
                                .setStyle(Discord.TextInputStyle.Paragraph)
                        )
                )
            interaction.showModal(modal)
        }
        else if (subCommand === "accept") {
            const modal = new Discord.ModalBuilder()
                .setCustomId("acceptmodal")
                .setTitle("Accept Suggestion")
                .setComponents(
                    new Discord.ActionRowBuilder()
                        .setComponents(
                            new Discord.TextInputBuilder()
                                .setCustomId("id")
                                .setLabel("ID")
                                .setStyle(Discord.TextInputStyle.Short),
                        ),
                        new Discord.ActionRowBuilder().setComponents(new Discord.TextInputBuilder().setLabel('Reason').setCustomId('reason').setStyle(Discord.TextInputStyle.Paragraph))
                )

                interaction.showModal(modal)
        } else if (subCommand === "deny") {
            const modal = new Discord.ModalBuilder()
                .setCustomId("denymodal")
                .setTitle("Deny Suggestio")
                .setComponents(
                    new Discord.ActionRowBuilder()
                        .setComponents(
                            new Discord.TextInputBuilder()
                                .setCustomId("id")
                                .setLabel("ID")
                                .setStyle(Discord.TextInputStyle.Short),
                        ),
                        new Discord.ActionRowBuilder().setComponents(new Discord.TextInputBuilder().setLabel('Reason').setCustomId('reason').setStyle(Discord.TextInputStyle.Paragraph))
                )
                interaction.showModal(modal)
        }
    }
}