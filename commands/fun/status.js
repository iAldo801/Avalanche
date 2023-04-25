const Discord = require("discord.js");
const mcs = require('node-mcstatus');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

module.exports = {
    name: 'status',
    description: 'Shows the status of the bot.',

    run: async (client, interaction) => {
        const host = 'combo.land';

        mcs.statusJava(host).then(async (res) => {
            const playersCount = `${res.players.online}/${res.players.max}`;
            const motd = res.motd.clean;

            const canvas = createCanvas(800, 130);
            const ctx = canvas.getContext('2d');

            registerFont(path.join(__dirname, '../../minecraft.ttf'), { family: 'Minecraft' });

            const bg = await loadImage(path.join(__dirname, '../../image.png'));
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

            ctx.font = 'bold 24px "Minecraft"';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${motd}`, 20, 50);

            const icon = await loadImage(path.join(__dirname, '../../icon.png'));
            ctx.drawImage(icon, canvas.width - 100, 20, 80, 80);

            const attachment = new Discord.AttachmentBuilder(canvas.toBuffer());

            interaction.reply({ files: [attachment] });
        }).catch((err) => {
            console.log(err);
        });
    }
};