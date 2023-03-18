const Discord = require("discord.js")

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