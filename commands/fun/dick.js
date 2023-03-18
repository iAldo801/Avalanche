const Discord = require("discord.js")

module.exports = {
    name: "dick",
    description: "ola pe gaaa",

    run: async (client, interaction) => {

        const dick = Math.floor(Math.random() * 999) + 1;


        if (interaction.user.id === "457245988516528138") { // iAldo80
            const embed1 = new Discord.EmbedBuilder()
                .setDescription("Your dick size is 1000000cm")
                .setColor("Orange")
            interaction.reply(
                {
                    embeds: [
                        embed1
                    ]
                }
            )
        }

        else if (interaction.user.id === "552926728570273792") { // cone
            const embed1 = new Discord.EmbedBuilder()
                .setDescription("Your dick size is 1000000cm ")
                .setColor("Orange")
            interaction.reply(
                {
                    embeds: [
                        embed1
                    ]
                }
            )
        }

        else if (interaction.user.id === "807810010225573948") { // guayabita
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your dick size is -" + dick + "cm" + "(oye la tienes re chiquita pe)")
                .setColor("DarkRed")
            interaction.reply(
                {
                    embeds: [
                        embed
                    ]
                }
            )
        }

        else if (interaction.user.id === "390642923366252550") { // alwk
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your dick size is -" + dick + "cm" + "(oye la tienes re chiquita pe)")
                .setColor("DarkRed")
            interaction.reply(
                {
                    embeds: [
                        embed
                    ]
                }
            )
        }

        else if (interaction.user) {
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your dick size is " + dick + "cm")
                .setColor("Orange")
            interaction.reply(
                {
                    embeds: [
                        embed
                    ]
                }
            )
        }
    }
}