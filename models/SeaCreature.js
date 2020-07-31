const mongoose = require('mongoose');

const seaCreatureSchema = new mongoose.Schema({
    name: String,
    cphrase: String,
    mphrase: String,
    icon: String,
    image: String,
    price: String,
    location: String,
    time: String,
    seaMonthsNorth: Array,
    seaMonthsSouth: Array,
    shadow: String,
    speed: String
});

module.exports = mongoose.model('Sea Creature', seaCreatureSchema);