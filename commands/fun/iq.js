const Discord = require('discord.js');

module.exports = {
    name: 'iq',
    description: 'Shows your iq',

    run: async (client, interaction) => {


        const iq = Math.floor(Math.random() * 100);

        if (interaction.user.id === "457245988516528138") { // iAldo80
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your iq is 1000000000000000000000000000000 (RE-INTELIGENTE QUE ES EL WEON PE GAAAAAAAA")
                .setColor("Orange")
            interaction.reply(
                {
                    embeds: [
                        embed
                    ]
                }
            )
        }

        else if (interaction.user.id === "807810010225573948") { // guayabita
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your iq is -9999999999999999999999999999999999999 (re tonto era el weon JAJA nuv)")
                .setColor("Random")
            interaction.reply(
                {
                    embeds: [
                        embed
                    ]
                }
            )
        }


        else if (interaction.user.id === "856909490222006292") { // rhylow
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your iq is 0 (re tonto era el weon JAJA nuv)")
                .setColor("Random")
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
                .setDescription("Your iq is 0 (re tonto era el weon JAJA nuv)")
                .setColor("Random")
            interaction.reply(
                {
                    embeds: [
                        embed
                    ]
                }
            )
        }


        else if (interaction.user.id === "702628467065225217") { // lunar
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your iq is 0 (re tonto era el weon JAJA nuv)")
                .setColor("Random")
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
                .setDescription("Your iq is " + iq)
                .setColor("Random")
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