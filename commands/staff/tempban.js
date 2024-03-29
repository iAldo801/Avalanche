const Discord = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))
const ms = require("ms")

module.exports = {
    name: 'tempban',
    description: 'Bans a user from the server.',
    options: [
        {
            name: 'user',
            description: 'The user to ban.',
            type: 6,
            required: true
        },
        {
            name: 'delete_messages',
            description: 'The amount of days to delete the messages.',
            required: true,
            type: 3,
            choices: [
                {
                    name: "Don't Delete Any",
                    value: '0'
                },
                {
                    name: "Previous 24 Hours",
                    value: '1'
                },
                {
                    name: "Previous 7 Days",
                    value: '7'
                }
            ]
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            type: 3,
            required: false
        },
        {
            name: 'time',
            description: "f",
            type: 3,
            required: false
        }
    ],

    run: async (client, interaction) => {

        if (!commands.tempban.enabled) {
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
        const time = options.getString('time') || 0

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: 'You do not have permission to ban members!', ephemeral: true });

        if (user.id === interaction.user.id) return interaction.reply({ content: 'You cannot ban yourself!', ephemeral: true });
        if (user.id === client.user.id) return interaction.reply({ content: 'You cannot ban me!', ephemeral: true });
        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: 'You cannot ban the server owner!', ephemeral: true });

        const amount = options.getString('delete_messages') || '0';
        const membera = await interaction.guild.members.fetch(user.id).catch(console.error);
        await membera.ban({ days: amount, reason: reason }).catch(err => {
            if (err === 50013) return console.log({ content: 'I do not have permission to ban members!', ephemeral: true });
        })

        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.ban.title)
            .setDescription(embeds.ban.description.replace('{user}', user.username).replace('{reason}', reason).replace('{moderator}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.ban.color)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] })

        setTimeout(async () => {
            const memberaaa = await interaction.guild.members;
            await memberaaa.unban(user)
        }, ms(time))
    }
}