const Discord = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embedsConfig = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commandsConfig = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))
const ms = require("ms")
const userDataSchema = require('../../schemas/userDataSchema');

module.exports = {
    name: 'tempmute',
    description: 'Mutes a user from the server.',
    options: [
        {
            name: 'user',
            description: 'The user to mute.',
            type: 6,
            required: true
        },
        {
            name: 'time',
            description: "f",
            type: 3,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            type: 3,
            required: false
        },

    ],

    run: async (client, interaction) => {

        if (!commandsConfig.tempmute.enabled) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(commandsConfig.disabled.title)
                .setDescription(commandsConfig.disabled.description)
                .setColor(commandsConfig.disabled.color)
                .setTimestamp();

            return interaction.reply({ embeds: [embed] }).then(() => {

                setTimeout(() => {
                    interaction.deleteReply().catch(console.error);
                }, 5000);
            }).catch(console.error);
        }

        const { guild, member, options } = interaction;

        const user = options.getUser('user') || interaction.user;
        const reason = options.getString('reason') || "No reason provided.";
        const time = options.getString('time') || 0;
        const mutedRole = guild.roles.cache.get(commandsConfig.roles.muted);
        const target = guild.members.cache.get(user.id);
        const date = new Date().toLocaleString();

        const userhasrole = new Discord.EmbedBuilder()
            .setTitle(commandsConfig.user_has_roles.title)
            .setDescription(commandsConfig.user_has_roles.description)
            .setColor(commandsConfig.user_has_roles.color)
            .setTimestamp();


        if (user.id === interaction.user.id) return interaction.reply({ content: 'You cannot mute yourself!', ephemeral: true });
        if (user.id === client.user.id) return interaction.reply({ content: 'You cannot mute me!', ephemeral: true });
        if (user.id === interaction.guild.ownerId) return interaction.reply({ content: 'You cannot mute the server owner!', ephemeral: true });
        if (target.roles.cache.has(mutedRole.id)) return interaction.reply({ embeds: [userhasrole] })
            .then(() => {
                setTimeout(() => {
                    interaction.deleteReply().catch(console.error);
                }, 5000);
            }).catch(console.error);

        target.roles.add(mutedRole);

        const data = await userDataSchema.findOne({ userID: user.id })
        if (data) {
            console.log("Creating data...")
            const sanctions = data.sanctions
            sanctions.push({
                "reason": reason,
                "type": "TEMP_MUTE",
                "staff": interaction.user.username,
                "date": date
            })
            data.save()
        } else {
            console.log("Updating data...")
            new userDataSchema({
                guildID: guild.id,
                userID: user.id,
                sanctions: [
                    {
                        "reason": reason,
                        "type": "TEMP_MUTE",
                        "staff": interaction.user.username,
                        "date": date
                    }
                ]
            }).save()
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle(embedsConfig.mute.tempmute.title)
            .addFields([
                {
                    name: embedsConfig.mute.tempmute.fields.one.name,
                    value: embedsConfig.mute.tempmute.fields.one.value.replace("{user}", user.username),
                    inline: true

                },
                {
                    name: embedsConfig.mute.tempmute.fields.two.name,
                    value: embedsConfig.mute.tempmute.fields.two.value.replace("{reason}", reason),
                    inline: true
                },
                {
                    name: embedsConfig.mute.tempmute.fields.three.name,
                    value: embedsConfig.mute.tempmute.fields.three.value.replace("{time}", new Date().toLocaleString()),
                    inline: true
                },
                {
                    name: embedsConfig.mute.tempmute.fields.four.name,
                    value: embedsConfig.mute.tempmute.fields.four.value.replace("{staff}", interaction.user.username),
                    inline: true
                },
                {
                    name: embedsConfig.mute.tempmute.fields.five.name,
                    value: embedsConfig.mute.tempmute.fields.five.value.replace("{date}", new Date().toLocaleString()),
                    inline: true
                }
            ])
            .setColor(embedsConfig.mute.tempmute.color)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        await interaction.reply({ embeds: [embed] })

        setTimeout(async () => {
            await target.roles.remove(mutedRole)
        }, ms(time))
    }
}