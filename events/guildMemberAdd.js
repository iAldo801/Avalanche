const client = require('../index');
const userData = require('../schemas/userDataSchema');

client.on('guildMemberAdd', async (member) => {
    const user = await userData.findOne({ guildID: member.guild.id, userID: member.user.id });
    if (!user) {
        const newUser = new userData({
            guildID: member.guild.id,
            userID: member.user.id,
            time: new Date().toLocaleString(),
            sanctions: [],
        });
        await newUser.save();
    }
});