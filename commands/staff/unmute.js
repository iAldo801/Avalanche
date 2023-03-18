const Discord = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'unmute',
    description: 'unmute a user from the server.',
    options: [
        {
            name: 'user',
            description: 'The user to mute.',
            type: 6,
            required: true
        },
    ],

    run: async (client, interaction) => {

        if (!commands.unmute.enabled) {
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
        const target = guild.members.cache.get(user.id);
        const mutedRole = guild.roles.cache.get(embeds.mute.role);

        if (!interaction.member.roles.cache.has(commands.staff.role)) return interaction.reply({ content: 'You do not have permission to unmute members!', ephemeral: true });

        target.roles.remove(mutedRole);

        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.unmute.title)
            .setDescription(embeds.unmute.description.replace('{user}', user.username).replace('{moderator}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.unmute.color)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] })

    }
}