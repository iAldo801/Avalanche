const Discord = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');
const embeds = yaml.load(fs.readFileSync('./config/embeds.yml', 'utf8'));

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
        const { guild, member, options } = interaction;

        const user = options.getUser('user') || interaction.user;



        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.history.title)
            .setDescription(embeds.history.description.replace('{user}', user.username).replace('{moderator}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.history.color)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
