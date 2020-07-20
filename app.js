const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Critterpedia', {useNewUrlParser: true, useUnifiedTopology: true });
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

const Fish = mongoose.model('Fish', fishSchema);

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/critters', (req, res) => {
    Fish.find({}, (err, fish) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', { fish: fish });
        }
    });
});

app.listen(3000, () => {
    console.log('Critterpedia served on port 3000');
});