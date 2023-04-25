const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'role',
    description: 'Gives a role to a user.',
    options: [
        {
            name: 'user',
            description: 'The user to give the role to.',
            type: 6,
            required: true
        },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getUser('user') || interaction.user;
        const role = interaction.options.getRole('role');


        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if (member.roles.cache.has(role.id)) {
            member.roles.remove(role.id).catch(console.error);
        } else {
            member.roles.add(role.id).catch(console.error);
        }

        const embed = new Discord.EmbedBuilder()
            .setTitle(embeds.role.title)
            .setDescription(embeds.role.description.replace('{user}', user.username).replace('{role}', role.id).replace('{moderator}', interaction.user.username).replace('{date}', new Date().toLocaleString()))
            .setColor(embeds.role.color)
            .setTimestamp()

        interaction.reply({ embeds: [embed] });
    }
}