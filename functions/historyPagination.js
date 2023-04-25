const { ButtonBuilder, ActionRowBuilder, ComponentType } = require("discord.js");

async function paginarEmbeds(interaction, embeds, initial = 0) {

  const a = interaction;
  let current = initial;

  const buttons = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('first')
        .setLabel('First')
        .setStyle('Success'),
      new ButtonBuilder()
        .setCustomId('previous')
        .setLabel('Previous')
        .setStyle('Secondary'),
      new ButtonBuilder()
        .setCustomId('next')
        .setLabel('Next')
        .setStyle('Secondary'),
      new ButtonBuilder()
        .setCustomId('last')
        .setLabel('Last')
        .setStyle('Danger'));

  const collector = interaction.channel.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 10000
  });

  interaction.reply({
    embeds: [embeds[current]],
    components: [buttons],
    ephemeral: true,
  });

  collector.on('collect', async (interaction) => {
    if (interaction.replied) {
      return;
    }
    interaction.deferUpdate();

    if (interaction.customId === 'next') {
      current++;
      if (current >= embeds.length) {
        current = 0;
      }
    } else if (interaction.customId === 'previous') {
      current--;
      if (current < 0) {
        current = embeds.length - 1;
      }
    } else if (interaction.customId === 'last') {
      current = embeds.length - 1;
    } else if (interaction.customId === 'first') {
      current = 0;
    } else if (interaction.customId === 'ban') {
      embeds.splice(current, 1);


      if (current === embeds.length) {
        current--;
      }
    }

    await a.editReply({ embeds: [embeds[current]], components: [buttons], ephemeral: true });
  });

  collector.on('end', async () => {
    await a.editReply({ components: [] });
  });
}

module.exports = paginarEmbeds;
