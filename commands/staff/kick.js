const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    options: [
        {
            name: 'user',
            description: 'The user to kick.',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the kick.',
            type: 3,
            required: false
        }
    ],

    run: async (client, interaction) => {

        if (!commands.kick.enabled) {
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

        const { guild, member, options } = interaction;

        const user = options.getUser('user') || interaction.user
        const reason = options.getString('reason') || "No reason provided."

        if (user.id === interaction.user.id) return interaction.reply({ content: 'You cannot kick yourself!', ephemeral: true });
        if (user.id === client.user.id) return interaction.reply({ content: 'You cannot kick me!', ephemeral: true });
        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: 'You cannot kick the server owner!', ephemeral: true });

        const membera = await interaction.guild.members.fetch(user.id).catch(console.error);
        await membera.kick({ reason: reason }).catch(err => {
            if (err === 50013) return console.log({ content: 'I do not have permission to kick members!', ephemeral: true });
        });

        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.kick.title)
            .setDescription(embeds.kick.description.replace('{user}', user.username).replace('{reason}', reason).replace('{moderator}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.kick.color)
            .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    }
}