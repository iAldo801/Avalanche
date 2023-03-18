const Discord = require('discord.js');
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: 'serverinfo',
    description: 'Get information about the server.',

    run: async (client, interaction) => {



        const embed = new Discord.EmbedBuilder()
            .setTitle('Server Info')
            .setDescription(embeds.serverinfo.description.replace('{serverowner}', interaction.guild.ownerId).replace('{servername}', interaction.guild.name).replace('{servercreateddate}', interaction.guild.createdAt).replace('{membercount}', interaction.guild.memberCount))
            .setColor(embeds.serverinfo.color)
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}