const client = require('../index');
const Discord = require('discord.js');
const userData = require('../schemas/userDataSchema');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

client.on('guildMemberAdd', async (member) => {
    const user = await userData.findOne({ guildID: member.guild.id, userID: member.user.id });
    const userAndTag = `${member.user.username}#${member.user.discriminator}`;
    const channel = member.guild.channels.cache.get('1092628365061664799');
    
    const canvas = createCanvas(750, 500);
    const ctx = canvas.getContext('2d');

    registerFont(path.join(__dirname, '../bolgart.ttf'), { family: 'Bolgart' });

    const bg = await loadImage(path.join(__dirname, '../testbg.jpg'));
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 128 }));
    const avatarSize = 128; // the size of the avatar image
    const avatarX = 84 - avatarSize / 2; // calculate the x position to center the avatar
    const avatarY = 84 - avatarSize / 2; // calculate the y position to center the avatar

    // draw a circle clipping path
    ctx.beginPath();
    ctx.arc(84, 84, 64, 0, Math.PI * 2, true);
    ctx.clip();

    // draw the avatar image inside the clipping path, centered
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);

    ctx.font = 'bold 24px "Bolgart"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Welcome to the server ${userAndTag}!`, 200, 100);

    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), 'welcome.png');

    channel.send({ files: [attachment] });
});
