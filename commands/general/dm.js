const Discord = require('discord.js');

module.exports = {
    name: "dm",
    description: "Send a direct message",
    options: [{ name: "user", description: "Send dm to a user", type: 6, required: true }, { name: "message", description: "Send message to a user", type: 3, required: true }],

    run: async(client, interaction, args) => {

        const user = interaction.options.getUser("user") || interaction.user;
        const message = interaction.options.getString("message").replaceAll('\\n', '\n');

        user.send(message).then(async() => {
            await interaction.reply({ embeds: [
                new Discord.EmbedBuilder()
                .setDescription(`Message was sent successfully to ${user.tag}!`)
                .setColor("Green")
            ], ephemeral: true})
        }).catch((error) => {
           if (error.code === 50007) {
               interaction.reply({ embeds: [
                   new Discord.EmbedBuilder()
                   .setDescription("The user has direct messages disabled!")
                   .setColor("Red")
               ], ephemeral: true})
           }
        });
    }
};