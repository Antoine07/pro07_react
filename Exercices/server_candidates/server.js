const express = require('express');

const app = express();
const port = 3000;

app.use(function (req, res, next) {

    // tous les domaines
    if (req.headers.origin) { 
        res.header('Access-Control-Allow-Origin', req.headers.origin); 
        // res.header('Access-Controll-Allow-Credentials', 'true'); // pour les cookies
    }

    // type de requêtes acceptées 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');

    // pour les méthodes options pour put et post on précise que l'on accepte Content-Type et Accept (optionel)
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
        res.sendStatus(200);
    } else {
        next();
    }
});

// pas très utile ici mais limite à 1 mb les json que l'on échange
app.use(express.json({ limit: "1mb" }));

const candidates = [
    { choice_1: "Alan", choice_2: "Juliette", id: 1 },
    { choice_1: "Phi", choice_2: "Bernard", id: 2 },
    { choice_1: "Lisa", choice_2: "Elise", id: 3 },
    { choice_1: "Cecilia", choice_2: "Alice", id: 4 },
];

// get all candidates
app.get('/candidates', (req, res) => {
    // tout le monde (toutes les urls) peut accéder à cette ressource
    // la balise img cross plateform dans une page Web pas une API qui consomme les données avec une adresse HTTP
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.json(candidates);
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));