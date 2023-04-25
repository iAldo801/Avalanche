const Discord = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');
const embeds = yaml.load(fs.readFileSync('./config/embeds.yml', 'utf8'));
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))


module.exports = {
    name: 'nuke',
    description: 'Nukes a channel.',
    options: [
        {
            name: 'channel',
            description: 'The channel to nuke.',
            type: 7,
            required: false
        },
    ],

    run: async (client, interaction) => {

        if (!commands.nuke.enabled) {
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

        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.nuke.title)
            .setDescription(embeds.nuke.description.replace('{channel}', channel.name).replace('{username}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.nuke.color)
            .setTimestamp()

        channel.clone().then((ch) => {
            ch.setParent(channel.parent.id);
            ch.setPosition(channel.position);
            ch.send({ embeds: [embed] }).then((msg) => {
                setTimeout(() => {
                    msg.delete().catch(console.error);
                }, 3000);
            })
            channel.delete();
        });
    }
}