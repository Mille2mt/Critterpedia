const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SeaCreature = require('./models/SeaCreature');
const Fish = require('./models/Fish');
const Bugs = require('./models/Bugs');

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

//Routes

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/critters', async (req, res) => {
    try {
        let leavingCritters = {};
        let newCritters = {};
        const leavingFishQuery = {$and: [{fishMonthsNorth: thisMonth}, {fishMonthsNorth: {$ne: nextMonth}}]}
        const leavingBugsQuery = {$and: [{bugsMonthsNorth: thisMonth}, {bugsMonthsNorth: {$ne: nextMonth}}]}
        const leavingSeaQuery = {$and: [{seaMonthsNorth: thisMonth}, {seaMonthsNorth: {$ne: nextMonth}}]}
        const newFishQuery = {$and: [{fishMonthsNorth: lastMonth}, {fishMonthsNorth: {$ne: thisMonth}}]}
        const newBugsQuery = {$and: [{bugsMonthsNorth: lastMonth}, {bugsMonthsNorth: {$ne: thisMonth}}]}
        const newSeaQuery = {$and: [{seaMonthsNorth: lastMonth}, {seaMonthsNorth: {$ne: thisMonth}}]}

        await Promise.allSettled([
            Fish.find(leavingFishQuery)
            .then(docs => { Object.assign(leavingCritters, {fish : docs})}),
            Bugs.find(leavingBugsQuery)
            .then(docs => { Object.assign(leavingCritters, {bugs : docs})}),
            SeaCreature.find(leavingSeaQuery)
            .then(docs => { Object.assign(leavingCritters, {sea : docs})}),
            Fish.find(newFishQuery)
            .then(docs => { Object.assign(newCritters, {fish : docs})}),
            Bugs.find(newBugsQuery)
            .then(docs => { Object.assign(newCritters, {bugs : docs})}),
            SeaCreature.find(newSeaQuery)
            .then(docs => { Object.assign(newCritters, {sea : docs})})                    
        ]); 
        
        await res.render('index', {leavingCritters : leavingCritters, newCritters : newCritters});
        
    } catch (e) {
        await res.status(404).json(e);
    }       
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

