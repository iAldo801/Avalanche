const Discord = require("discord.js")
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {
    name: "dick",
    description: "ola pe gaaa",

    run: async (client, interaction) => {

        if (!commands.dick.enabled) {
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

        const dick = Math.floor(Math.random() * 99) + 1;


        if (interaction.user.id === "457245988516528138") { // iAldo80
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your dick size is 1000000cm")
                .setColor("Orange")
            interaction.reply(
                { embeds: [embed] }
            )
        }

        else if (interaction.user.id === "552926728570273792") { // cone
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your dick size is 1000000cm ")
                .setColor("Orange")
            interaction.reply(
                { embeds: [embed] }
            )
        }

        else if (interaction.user.id === "807810010225573948") { // guayabita
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your dick size is -" + dick + "cm" + "(oye la tienes re chiquita pe)")
                .setColor("DarkRed")
            interaction.reply(
                { embeds: [embed] }
            )
        }

        else if (interaction.user.id === "390642923366252550") { // alwk
            const embed = new Discord.EmbedBuilder()
                .setDescription("Your dick size is -" + dick + "cm" + "(oye la tienes re chiquita pe)")
                .setColor("DarkRed")
            interaction.reply(
                { embeds: [embed] }
            )
        }

        else if (interaction.user) {
            const embed = new Discord.EmbedBuilder()
                .setDescription(embeds.dick.description.replace('{dicksize}', dick))
                .setColor(embeds.dick.color)
            interaction.reply(
                { embeds: [embed] }
            )
        }
    }
}