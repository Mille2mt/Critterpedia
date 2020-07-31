const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const { response } = require('express');

mongoose.connect('mongodb://localhost/Critterpedia', {useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));

const seaCreatureSchema = new mongoose.Schema({
    name: String,
    cphrase: String,
    mphrase: String,
    icon: String,
    image: String,
    price: Number,
    location: String,
    time: String,
    seaMonthsNorth: Array,
    seaMonthsSouth: Array,
    shadow: String,
    speed: String
});

const SeaCreature = mongoose.model('Sea Creature', seaCreatureSchema);

axios.get('https://acnhapi.com/v1/sea/')
.then(function (response) {
    const json = response.data;
    const values = Object.values(json);

    //created variables to send to DB
    for ( let i = 0; i < values.length; i++) {
        const seaCreatureName = values[i]['file-name'];
        const seaCreatureCPhrase = values[i]['catch-phrase'];
        const seaCreatureMPhrase = values[i]['museum-phrase'];
        const seaCreatureIcon = values[i]['icon_uri'];
        const seaCreatureImage = values[i]['image_uri'];
        const seaCreaturePrice = parseInt(values[i]['price']);
        const seaCreatureLocation = values[i].availability.location;
        const seaCreatureTime = values[i].availability.time;
        const seaCreatureMonthsNorth = values[i].availability['month-array-northern'];
        const seaCreatureMonthsSouth = values[i].availability['month-array-southern'];
        const seaCreatureShadowSize = values[i].shadow;
        const seaCreatureSpeed = values[i].speed

        SeaCreature.create({
            name: seaCreatureName,
            cphrase: seaCreatureCPhrase,
            mphrase: seaCreatureMPhrase,
            icon: seaCreatureIcon,
            image: seaCreatureImage,   
            price: seaCreaturePrice,
            location: seaCreatureLocation,
            time: seaCreatureTime,
            seaMonthsNorth: seaCreatureMonthsNorth,
            seaMonthsSouth: seaCreatureMonthsSouth,
            shadowSize: seaCreatureShadowSize,
            speed: seaCreatureSpeed
        }, (err, seaCreature) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Added newly created Sea Creature');
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
