const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pong!',

    run: async (client, interaction, args) => {

        const embed = new Discord.EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`🏓 Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
            .setColor('Random');

        interaction.reply({ embeds: [embed] });

    }
}