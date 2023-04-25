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
    /**
     * @param {Discord.Interaction} interaction
     */

    run: async (client, interaction) => {

        if (!commands.history.enabled) {
            const embed = new Discord.MessageEmbed()
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
                if (userData.sanctions && userData.sanctions.length > 0) {

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

                    await interaction.reply({ embeds: [optionsembed], components: [actionRow], ephemeral: true });

                }
            } catch (err) {
                const embed = new Discord.EmbedBuilder()
                    .setTitle(embedsConfig.history.nohistory.title.replace('{user}', user.username))
                    .setDescription(embedsConfig.history.nohistory.description)
                    .setColor(embedsConfig.history.nohistory.color)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
            }
        }
    },
};