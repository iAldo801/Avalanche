const client = require('../index');
const userData = require('../schemas/userDataSchema');

client.on('guildMemberRemove', async (member) => {
    const user = await userData.findOne({ guildID: member.guild.id, userID: member.user.id });
    if (user) {
        await userData.deleteOne({ guildID: member.guild.id, userID: member.user.id });
    }
});