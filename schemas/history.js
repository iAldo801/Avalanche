const mongo = require('mongoose');
const historySchema = new mongo.Schema({
    guildID: String,
    userID: String,
    bansID: Array,
});

module.exports = mongo.model('history', historySchema);