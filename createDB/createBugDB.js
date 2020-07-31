const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const { response } = require('express');

mongoose.connect('mongodb://localhost/Critterpedia', {useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));

const bugSchema = new mongoose.Schema({
    name: String,
    cphrase: String,
    mphrase: String,
    icon: String,
    image: String,
    rarity: String,
    price: Number,
    sprice: Number,
    location: String,
    time: String,
    bugMonthsNorth: Array,
    bugMonthsSouth: Array
});

const Bug = mongoose.model('Bug', bugSchema);

axios.get('https://acnhapi.com/v1/bugs/')
.then(function (response) {
    const json = response.data;
    const values = Object.values(json);

    //created variables to send to DB
    for ( let i = 0; i < values.length; i++) {
        const bugName = values[i]['file-name'];
        const bugCPhrase = values[i]['catch-phrase'];
        const bugMPhrase = values[i]['museum-phrase'];
        const bugIcon = values[i]['icon_uri'];
        const bugImage = values[i]['image_uri'];
        const bugRarity = values[i].availability.rarity;
        const bugPrice = parseInt(values[i]['price']); //turn to string using .toString()
        const bugSpecPrice = parseInt(values[i]['price-cj']); //turn to string .toString()
        const bugLocation = values[i].availability.location;
        const bugTime = values[i].availability.time; //if string empty do something
        const bugMonthsNorth = values[i].availability['month-array-northern'];
        const bugMonthsSouth = values[i].availability['month-array-southern'];

        Bug.create({
            name: bugName,
            cphrase: bugCPhrase,
            mphrase: bugMPhrase,
            icon: bugIcon,
            image: bugImage,                
            rarity: bugRarity,
            price: bugPrice,
            specprice: bugSpecPrice,
            location: bugLocation,
            time: bugTime,
            bugMonthsNorth: bugMonthsNorth,
            bugMonthsSouth: bugMonthsSouth
        }, (err, bug) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Added newly created bug');
            }
        });
    }
})
.catch(function (error) {
    // handle error
    console.log(error);
})
.finally(function () {
    
});
