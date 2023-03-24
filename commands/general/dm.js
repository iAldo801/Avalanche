const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: "dm",
    description: "Send a direct message",
    options: [{ name: "user", description: "Send dm to a user", type: 6, required: true }, { name: "message", description: "Send message to a user", type: 3, required: true }],

    run: async(client, interaction, args) => {

        if (!commands.dm.enabled) {
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