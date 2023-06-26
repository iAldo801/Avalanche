const Discord = require("discord.js")
const fs = require("fs")
const yaml = require("js-yaml")
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

module.exports = {

    name: "troll",
    description: "Tag someone multiple times!",
    options: [

        {
            name: "user",
            description: "The person to troll!",
            type: 6,
            required: true
        },
        {
            name: "times",
            description: "How many times to troll this person",
            type: 10,
            required: true
        }
    ],

    run: async (client, interaction) => {

        if (!commands.troll.enabled) {
            const disabledCommand = new Discord.EmbedBuilder()
                .setTitle(commands.disabled.title)
                .setDescription(commands.disabled.description)
                .setColor(commands.disabled.color)
                .setTimestamp();

            return interaction.reply({ embeds: [disabledCommand] }).then(() => {

                setTimeout(() => {
                    interaction.deleteReply().catch(console.error);
                }, 5000);
            }).catch(console.error);
        }

        const user = interaction.options.getUser("user")
        const times = interaction.options.getNumber("times")

        if (times > eval(commands.troll.max_mentions)) {

            const maxMentions = new Discord.EmbedBuilder()
                .setTitle(commands.troll.max_mentions.replace('{max_mentions}', eval(commands.troll.max_mentions)))
                .setColor(commands.troll.max_mentions_color)

            return interaction.reply({ embeds: [maxMentions] })
        }

        Array(times).fill().map((_, i) => interaction.channel.send(`<@${user.id}>`))

        interaction.reply({ content: "User is being trolled!", ephemeral: true })
    }
}
