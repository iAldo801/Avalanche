const Discord = require('discord.js');

module.exports = {
    name: 'pagination',
    description: 'Creates a pagination embed.',

    run: async (client, interaction) => {

        let currentIndex = 0;
        const initialEmbed = embeds[currentIndex];
        if (initialEmbed) {
          interaction.channel.send(initialEmbed)
            .then((msg) => {
              // Agregar reacciones al mensaje
              msg.react('⬅️');
              msg.react('➡️');
        
              // Manejar las reacciones
              paginator.on('collect', (reaction, user) => {
                reaction.users.remove(user.id);
        
                if (reaction.emoji.name === '⬅️' && currentIndex > 0) {
                  currentIndex--;
                  const currentEmbed = embeds[currentIndex];
                  if (currentEmbed) {
                    msg.edit(currentEmbed);
                  }
                } else if (reaction.emoji.name === '➡️' && currentIndex < embeds.length - 1) {
                  currentIndex++;
                  const currentEmbed = embeds[currentIndex];
                  if (currentEmbed) {
                    msg.edit(currentEmbed);
                  }
                }
              });
        
              // Eliminar las reacciones al finalizar el tiempo de espera
              paginator.on('end', () => {
                msg.reactions.removeAll();
              });
            });
        } else {
          interaction.channel.send('No hay contenido para mostrar en este paginador.');
        }
        
    }
}