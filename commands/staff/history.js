const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml");
const userDataSchema = require('../../schemas/userDataSchema');
const embedsConfig = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'history',
    description: 'Shows the history of a user.',
    options: [
        {
            name: 'user',
            description: 'The user to show the history of.',
            type: 6,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        if (!commands.history.enabled) {
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

        const user = options.getUser('user') || interaction.user;

        if (user) {
            try {
                const userData = await userDataSchema.findOne({ userID: user.id });

                const optionsembed = new Discord.EmbedBuilder()
                    .setTitle('Choose an option')
                    .setDescription('Choose an option to see the history of the user.')
                    .setColor('Orange')
                    .setTimestamp();

                const actionRow = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId(`bans-${user.id}`)
                            .setLabel('🚫 Bans')
                            .setStyle('Danger'),
                    )
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId(`mutes-${user.id}`)
                            .setLabel('🔇 Mutes')
                            .setStyle('Secondary'),
                    )

                await interaction.reply({ embeds: [optionsembed], components: [actionRow] }).then(() => {
                });
                
                const embeds = []
                const cursor = userDataSchema.find({ userID: user.id }).cursor();
                const length = await userDataSchema.countDocuments({ userID: user.id });
                for (let i = 0; i < length; i++) {
                    const doc = await cursor.next();
                    const embed = new Discord.EmbedBuilder()
                        .setTitle(embedsConfig.history.bans.title.replace('{user}', user.username))
                        .setDescription(embedsConfig.history.bans.description.replace('{user}', user.username).replace('{bans}', userDataSchema ? userDataSchema.banCount : 0))
                        .setColor(embedsConfig.history.bans.color)
                        .setTimestamp();
                    embeds.push(embed)
                }
                pagination(interaction, embeds)


                // const embed = new Discord.EmbedBuilder()
                //     .setTitle(embeds.history.title.replace('{user}', user.username))
                //     .setDescription(embeds.history.description.replace('{user}', user.username).replace('{bans}', userDataSchema ? userDataSchema.banCount : 0))
                //     .setColor(embeds.history.color)
                //     .setTimestamp();



                // await interaction.reply({ embeds: [embed] });

            } catch (err) {
                console.error(err);
                interaction.reply('Ocurrió un error al buscar el historial de baneos.');
            }
        } else {
            interaction.reply('Debes mencionar a un usuario.');
        }
    },
};