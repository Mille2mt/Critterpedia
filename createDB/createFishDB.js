const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const { response } = require('express');

mongoose.connect('mongodb://localhost/Critterpedia', {useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));

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

axios.get('https://acnhapi.com/v1/fish/')
.then(function (response) {
    const json = response.data;
    const values = Object.values(json);

    //created variables to send to DB
    for ( let i = 0; i < values.length; i++) {
        const fishName = values[i]['file-name'];
        const fishCPhrase = values[i]['catch-phrase'];
        const fishMPhrase = values[i]['museum-phrase'];
        const fishIcon = values[i]['icon_uri'];
        const fishImage = values[i]['image_uri'];
        const fishRarity = values[i].availability.rarity;
        const fishPrice = values[i]['price']; //turn to string using .toString()
        const fishSpecPrice = values[i]['price-cj']; //turn to string .toString()
        const fishLocation = values[i].availability.location;
        const fishTime = values[i].availability.time; //if string empty do something
        const fishMonthsNorth = values[i].availability['month-array-northern'];
        const fishMonthsSouth = values[i].availability['month-array-southern'];
        const fishShadowSize = values[i].shadow;

        Fish.create({
            name: fishName,
            cphrase: fishCPhrase,
            mphrase: fishMPhrase,
            icon: fishIcon,
            image: fishImage,                
            rarity: fishRarity,
            price: fishPrice,
            specprice: fishSpecPrice,
            location: fishLocation,
            time: fishTime,
            monthsNorth: fishMonthsNorth,
            monthsSouth: fishMonthsSouth,
            shadowSize: fishShadowSize
        }, (err, fish) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Added newly created fish');
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
