const client = require('../index.js');
const Discord = require('discord.js');
const paginarEmbeds = require('../functions/historyPagination');
const userDataSchema = require('../schemas/userDataSchema');
const fs = require("fs")
const yaml = require("js-yaml");
const embedsConfig = yaml.load(fs.readFileSync("./config/embeds.yml", "utf8"))
const commands = yaml.load(fs.readFileSync("./config/commands.yml", "utf8"))

client.on("interactionCreate", async (interaction) => {

    if (interaction.isButton()) {

        const embeds = [];
        const user = await client.users.fetch(interaction.customId.split("-")[1]);
        const userData = await userDataSchema.findOne({ userID: user.id });

        if (interaction.customId.split("-")[0] === "bans") {

            userData.sanctions.forEach((sanction) => {
                if (sanction.type === 'BAN') {
                    const ban = new Discord.EmbedBuilder()
                        .setTitle(embedsConfig.history.bans.title.replace("{user}", user.tag))

                        .addFields([
                            {
                                name: embedsConfig.history.bans.fields.one.name,
                                value: embedsConfig.history.bans.fields.one.value.replace("{staff}", sanction.staff),
                                inline: true

                            },
                            {
                                name: embedsConfig.history.bans.fields.two.name,
                                value: embedsConfig.history.bans.fields.two.value.replace("{reason}", sanction.reason),
                                inline: true
                            },
                            {
                                name: embedsConfig.history.bans.fields.three.name,
                                value: embedsConfig.history.bans.fields.three.value.replace("{date}", sanction.date),
                                inline: true
                            }

                        ])
                        .setColor(embedsConfig.history.bans.color)
                    embeds.push(ban);
                }
            });
            paginarEmbeds(interaction, embeds);
        } else if (interaction.customId.split("-")[0] === "mutes") {

            userData.sanctions.forEach((sanction) => {
                if (sanction.type === 'MUTE') {
                    const mute = new Discord.EmbedBuilder()
                        .setTitle(embedsConfig.history.mute.title.replace("{user}", user.tag))
                        .addFields([
                            {
                                name: embedsConfig.history.mute.fields.one.name,
                                value: embedsConfig.history.mute.fields.one.value.replace("{staff}", sanction.staff),
                                inline: true
                            },
                            {
                                name: embedsConfig.history.mute.fields.two.name,
                                value: embedsConfig.history.mute.fields.two.value.replace("{reason}", sanction.reason),
                                inline: true
                            },
                            {
                                name: embedsConfig.history.mute.fields.three.name,
                                value: embedsConfig.history.mute.fields.three.value.replace("{date}", sanction.date),
                                inline: true
                            }
                        ])
                        .setColor(embedsConfig.history.bans.color)
                    embeds.push(mute);
                }
            });
        }
    }
});