const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//App config

mongoose.connect('mongodb://localhost/Critterpedia', {useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Date variables
const today = new Date();
const lastMonth = today.getMonth();
const thisMonth = today.getMonth() + 1;
const nextMonth = today.getMonth() + 2;

//Collection schemas

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

const SeaCreature = mongoose.model('Sea Creature', seaCreatureSchema);

const Bugs = mongoose.model('Bug', bugSchema);

const Fish = mongoose.model('Fish', fishSchema);


//Routes

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/critters', (req, res) => {
    let query = {$and: [{fishMonthsNorth: thisMonth}, {fishMonthsNorth: {$ne: nextMonth}}]}
    

    Fish.find(query, (err, thisMonthFish) => {
        if (err) { 
            console.log(err);
        } else {
            res.render('index', {thisMonthFish : thisMonthFish});
        }
    }); 
});


app.get('/critters/fish/', (req, res) => {    
    const sortby = req.query.sortby;
    let sort = { };
    if (sortby === 'price') {
        sort[sortby] = -1
    } else {
        sort[sortby] = 1;
    }    
    sort.name = 1;
    Fish.find({}).sort(sort).exec((err, fish) => {
        if (err) {
            console.log(err)
        } else {
            res.render('fish', {fish : fish});
        }
    });
});


app.get('/critters/bugs/', (req, res) => {    
    const sortby = req.query.sortby;
    let sort = { };
    if (sortby === 'price') {
        sort[sortby] = -1
    } else {
        sort[sortby] = 1;
    }    
    sort.name = 1;
    Bugs.find({}).sort(sort).exec((err, bugs) => {
        if (err) {
            console.log(err)
        } else {
            res.render('bugs', {bugs : bugs});
        }
    });
});

app.get('/critters/seaCreatures/', (req, res) => {    
    const sortby = req.query.sortby;
    let sort = { };
    if (sortby === 'price') {
        sort[sortby] = -1
    } else {
        sort[sortby] = 1;
    }    
    sort.name = 1;
    SeaCreature.find({}).sort(sort).exec((err, seaCreatures) => {
        if (err) {
            console.log(err)
        } else {
            res.render('seaCreatures', {seaCreatures : seaCreatures});
        }
    });
});

app.listen(3000, () => {
    console.log('Critterpedia served on port 3000');
});