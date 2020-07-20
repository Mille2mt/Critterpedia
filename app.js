const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Critterpedia', {useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const fishSchema = new mongoose.Schema({
    name: String,
    cphrase: String,
    mphrase: String,
    icon: String,
    rarity: String,
    price: String,
    sprice: String,
    location: String,
    time: String,
    months: String,
    shadowSize: String
});

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
});const seaCreatureSchema = new mongoose.Schema({
    name: String,
    cphrase: String,
    mphrase: String,
    icon: String,
    image: String,
    rarity: String,
    price: String,
    location: String,
    time: String,
    bugMonthsNorth: Array,
    bugMonthsSouth: Array,
    shadow: String,
    speed: String
});

const SeaCreature = mongoose.model('Sea Creature', seaCreatureSchema);

const Bugs = mongoose.model('Bug', bugSchema);

const Fish = mongoose.model('Fish', fishSchema);

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/critters', (req, res) => {
    res.render('index');
});

app.get('/critters/fish', (req, res) => {
    Fish.find({}, (err, fish) => {
        if(err) {
            console.log(err);
        } else {
            res.render('fish', { fish: fish });
        }
    });
});

app.get('/critters/bugs', (req, res) => {
    Bugs.find({}, (err, bugs) => {
        if (err) {
            console.log(err)
        } else {
            res.render('bugs', { bugs : bugs })
        }
    });
});

app.get('/critters/seaCreatures', (req, res) => {
    SeaCreature.find({}, (err, seaCreatures) => {
        if (err) {
            console.log(err)
        } else {
            res.render('seaCreatures', { seaCreatures : seaCreatures })
        }
    });
});

app.listen(3000, () => {
    console.log('Critterpedia served on port 3000');
});