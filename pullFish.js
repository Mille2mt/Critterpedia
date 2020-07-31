const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//App config

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
    price: Number,
    sprice: Number,
    location: String,
    time: String,    
    fishMonthsNorth: Array,
    fishMonthsSouth: Array,
    shadowSize: String
});

const Fish = mongoose.model('Fish', fishSchema);

const today = new Date();
const currentMonth = today.getMonth() + 1;
const nextMonth = today.getMonth() + 2;


app.get('/', (req, res) =>{
    Fish.find({fishMonthsNorth : currentMonth}, (err, thisMonthFish) => {
        if (err) {
            console.log(err)
        } else {
            Fish.find({fishMonthsNorth : nextMonth}, (err, nextMonthFish) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('index', {thisMonthFish : thisMonthFish, nextMonthFish : nextMonthFish});
                }
            });
        }
    });
});


