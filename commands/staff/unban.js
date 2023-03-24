const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'unban',
    description: 'Unban a user from the server.',
    options: [
        {
            name: 'user',
            description: 'The user to unban.',
            type: 3,
            required: true
        },
    ],


    run: async (client, interaction) => {

        if (!commands.unban.enabled) {
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

        const user = interaction.options.getString('user')

        if (user.id === interaction.user.id) return interaction.reply({ content: 'You cannot ban yourself!', ephemeral: true });
        if (user.id === client.user.id) return interaction.reply({ content: 'You cannot ban me!', ephemeral: true });
        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: 'You cannot ban the server owner!', ephemeral: true });

        const membera = await interaction.guild.members;
        await membera.unban(user)
        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.unban.title)
            .setDescription(embeds.unban.description.replace('{user}', user).replace('{moderator}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.unban.color)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] })
    }
}