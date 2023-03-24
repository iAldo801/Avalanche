const client = require('../index.js');
const Discord = require('discord.js');

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
        //await interaction.deferReply({ ephemeral: false })
        const command = client.slash.get(interaction.commandName);
        if (!command) return;
        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 1) {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        command.run(client, interaction, args)
    } else if (interaction.isButton()) {
        if (interaction.customId === 'accept') {
            interaction.update({ content: 'Accepted!', components: [] });
        }
    }
});