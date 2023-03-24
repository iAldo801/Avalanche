const Discord = require("discord.js")
const client = require("../index.js")
const fs = require("fs")
const yaml = require("js-yaml")
const embeds = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

client.on("interactionCreate", async (interaction) => {
    if (interaction.isModalSubmit()) {
        if (interaction.customId === "suggestion") {
            const suggestion = interaction.fields.getTextInputValue("suggestion")
            const channel = client.channels.cache.get(commands.channels.suggestions)
            const embed = new Discord.EmbedBuilder()
                .setTitle("New Suggestion")
                .setDescription(suggestion)
                .setFields([{
                    name: "Status",
                    value: ">  *Pending*",
                    inline: true,
                }])
                .setFooter({ text: `Suggested by ${interaction.user.tag}` })
                .setColor('Random')
                .setTimestamp()
            channel.send({ embeds: [embed] }).then(msg => {
                msg.react("✅")
                msg.react("❌")
            })
            interaction.reply({ content: "Your suggestion has been sent!", ephemeral: true })
        } else if (interaction.customId === "acceptmodal") {
            const id = interaction.fields.getTextInputValue("id")
            const reason = interaction.fields.getTextInputValue("reason")
            const suggestedEmbed = await client.channels.cache.get(commands.suggestions.channel).messages.fetch(id)

            const embed = new Discord.EmbedBuilder()
                .setTitle(suggestedEmbed.embeds[0].title)
                .setDescription(suggestedEmbed.embeds[0].description)
                .setFields([{
                    name: "Status",
                    value: `> \*Accepted\*\n\* \> Reason: ${reason}\*`,
                    inline: true,
                }])
                .setFooter(suggestedEmbed.embeds[0].footer)
                .setColor("Green")

            await suggestedEmbed.edit({ embeds: [embed] })
            interaction.reply({ content: "Suggestion has been accepted!", ephemeral: true })
        }
    }
})