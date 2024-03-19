require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const POKEMON_APP_ID = process.env.POKEMON_APP_ID;
const POKEMON_CO_ID = process.env.POKEMON_CO_ID;

const hubspotHeaders = {
    headers: {
        'Authorization': `Bearer ${POKEMON_APP_ID}`,
        'Content-Type': 'application/json'
    }
}

app.get('/', async (req, res) => {
    console.log('Get');

    const url = `https://api.hubapi.com/crm/v3/objects/${POKEMON_CO_ID}?limit=100&archived=false&properties=name&properties=primary_type&properties=secondary_type`;

    try {
        const response = await axios.get(url, hubspotHeaders);
        console.log('response', response.data.results);

        const pokemons = response.data.results.map(result => result.properties);

        res.render('homepage', { pokemons })
    } catch (error) {
        console.error('error in get', error)
        return;
    }
}
);

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));