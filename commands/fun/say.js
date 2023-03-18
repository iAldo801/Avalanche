const Discord = require("discord.js")

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

        const text = interaction.options.getString("message")
        interaction.reply(text)
    }
}