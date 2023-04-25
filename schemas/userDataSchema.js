const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    guildID: String,
    userID: String,
    time: String,
    sanctions: Array,
    warnid: String
});

module.exports = mongoose.model('userData', userDataSchema);