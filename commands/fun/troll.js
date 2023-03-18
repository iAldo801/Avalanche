const Discord = require("discord.js")

module.exports = {

    name: "troll",
    description: "Tag someone multiple times!",
    options: [

        {
            name: "user",
            description: "The person to troll!",
            type: 6,
            required: true
        },
        {
            name: "times",
            description: "How many times to troll this person",
            type: 10,
            required: true
        }
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getUser("user")
        const times = interaction.options.getNumber("times")

        if (times > 999) return interaction.reply({ content: "You can only troll someone 10 times!", ephemeral: true })

        Array(times).fill().map((_, i) => interaction.channel.send(`<@${user.id}>`))

        interaction.reply({ content: "User is being trolled!", ephemeral: true })
    } 
}
