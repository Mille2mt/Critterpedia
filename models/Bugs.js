const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    name: String,
    cphrase: String,
    mphrase: String,
    icon: String,
    image: String,
    rarity: String,
    price: String,
    sprice: String,
    location: String,
    time: String,
    bugMonthsNorth: Array,
    bugMonthsSouth: Array
});

module.exports = mongoose.model('Bug', bugSchema);