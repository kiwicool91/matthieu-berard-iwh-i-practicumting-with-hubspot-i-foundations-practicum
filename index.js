require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const POKEMON_APP_ID = process.env.POKEMON_APP_ID;
const POKEMON_CO_ID = process.env.POKEMON_CO_ID;

const hubspotHeaders = {
    headers: {
        'Authorization': `Bearer ${POKEMON_APP_ID}`,
        'Content-Type': 'application/json'
    }
}

app.get('/', async (req, res) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${POKEMON_CO_ID}?limit=100&archived=false&properties=name&properties=primary_type&properties=secondary_type`;

    try {
        const response = await axios.get(url, hubspotHeaders);
        const pokemons = response.data.results.map(result => result.properties);

        res.render('homepage', { pokemons })
    } catch (error) {
        console.error('error in get', error)
        return;
    }
}
);

app.get('/update-cobj', async (req, res) => {
    res.render('updates', {title: "Update Custom Object Form | Integrating With HubSpot I Practicum."})
}
);

app.post('/update-cobj', async (req, res) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${POKEMON_CO_ID}`;
    const formData = req.body

    try {
        const item = {
            properties: {
                "name": formData.name,
                "primary_type": formData.primary_type,
                "secondary_type": formData.secondary_type
            }
        };
        await axios.post(url, item, hubspotHeaders);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.response ? error.response.data : 'Error on update cobj');
    }
}
);

app.listen(3000, () => console.log('Listening on http://localhost:3000'));