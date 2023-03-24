const Discord = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'mute',
    description: 'Mute a user from the server.',
    options: [
        {
            name: 'user',
            description: 'The user to mute.',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the mute.',
            type: 3,
            required: false
        },
    ],

    run: async (client, interaction) => {

        if (!commands.mute.enabled) {
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
        const reason = options.getString('reason') || "No reason provided."
        const mutedRole = guild.roles.cache.get(commands.roles.muted);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) return interaction.reply({ content: 'You do not have permission to muite members!', ephemeral: true });

        if (user.id === interaction.user.id) return interaction.reply({ content: 'You cannot mute yourself!', ephemeral: true });
        if (user.id === client.user.id) return interaction.reply({ content: 'You cannot mute me!', ephemeral: true });
        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: 'You cannot mute the server owner!', ephemeral: true });

        target.roles.add(mutedRole);

        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.mute.title)
            .setDescription(embeds.mute.description.replace('{user}', user.username).replace('{reason}', reason).replace('{moderator}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.mute.color)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] })

    }
}