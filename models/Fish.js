const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
    name: String,
    cphrase: String,
    mphrase: String,
    icon: String,
    rarity: String,
    price: Number,
    sprice: Number,
    location: String,
    time: String,
    shadowSize: String,
    fishMonthsNorth: Array,
    fishMonthsSouth: Array
});

module.exports = mongoose.model('Fish', fishSchema);