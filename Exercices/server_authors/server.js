const express = require('express');
// const cors = require('cors');

const app = express();
const port = 3000;
// app.use(cors());

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
})

app.use(express.json({ limit: "1mb" }));

let authors = new Map([
    [
        "3hj9ecwzc5", 
            {
                "number" : 1,
                "name": "Alan",
                "bio": "DEA à l'université Luminy",
                "shop_name": "fnac",
                "books": ["Javascript", "Eloquent JavaScript, Second Edition"]
            },
    ],
    [
        "ii3v6javys", 
            {
                "number" : 2,
                "name": "Albert",
                "bio": "BAC science et stages au CNRS",
                "shop_name": "librarie grande rue",
                "books": ["Maths", "Relativité restreinte"]
            }
    ],
    [
        "ii3v6jaYUY", 
            {
                "number" : 3,
                "name": "Sophie",
                "bio": "Science po",
                "shop_name": "librarie",
                "books": ["Politique", "Ecologie"]
            }
    ],
    [
        "81928usije", 
            {
                "number" : 4,
                "name": "Alice",
                "bio": "Brevet des collège",
                "shop_name": "fnac",
                "books": ["Le pays des merveilles", "un monde merveilleux"]
            },
    ],
    [
        "8798uhyek", 
            {
                "number" : 5,
                "name": "Phil",
                "bio": "Médecine",
                "shop_name": "fnac",
                "books": ["néphrologie", "beta bloquant"]
            }
    ],
    [
        "81928usije", 
            {
                "number" : 6,
                "name": "Alice I",
                "bio": "Brevet des collège",
                "shop_name": "fnac",
                "books": ["Le pays des merveilles", "un monde merveilleux"]
            },
    ],
    [
        "81928usije", 
            {
                "number" : 7,
                "name": "Alice II",
                "bio": "Brevet des collège",
                "shop_name": "fnac",
                "books": ["Le pays des merveilles", "un monde merveilleux"]
            },
    ],
    [
        "81928usije", 
            {
                "number" : 8,
                "name": "Alice III",
                "bio": "Brevet des collège",
                "shop_name": "fnac",
                "books": ["Le pays des merveilles", "un monde merveilleux"]
            },
    ],
    [
        "81928usije", 
            {
                "number" : 9,
                "name": "Alice IV",
                "bio": "Brevet des collège",
                "shop_name": "fnac",
                "books": ["Le pays des merveilles", "un monde merveilleux"]
            },
    ],
    [
        "81928usije", 
            {
                "number" : 10,
                "name": "Alice V",
                "bio": "Brevet des collège",
                "shop_name": "fnac",
                "books": ["Le pays des merveilles", "un monde merveilleux"]
            },
    ],
]);

// get all authors
app.get('/authors', (req, res) => {

    res.json( Array.from(authors) );
});

// store new Author
app.post('/add', (req, res) => {
    const { name, id } = req.body;
    authors.set(id, req.body);

    res.json({
        status: 'success',
        name: name,
        id : id
    });
});

// get one author 
app.get('/author/:id', (req, res) => {
    const { id } = req.params;

    if (authors.has(id)) {
        const author = authors.get(id);
        res.json({
            status: 'success',
            id: id,
            author: JSON.stringify(author)
        });
    }
    else
        res.status(404).send('Author not found'); // TODO gestion des authors non trouvé dans l'app
});

// update One Author

app.put('/author/:id', (req, res, next) => {
    const { id } = req.params;

    if (authors.has(id)) {
        authors.set(id, req.body); // update 
        
        const author = authors.get(id);
        res.json({
            status: 'success',
            id: id,
            author: JSON.stringify(author)
        });
    }
    else
        res.status(404).send('Author not found');
});


// delete author
app.delete('/author/:id', (req, res) => {
    const { id } = req.params;

    if (authors.has(id)) {
        const name = authors.get(id).name;
        authors.delete(id);
        res.json({
            status: 'success deleted author',
            lastId: id + Math.random().toString(),
            name: name
        });
    }
    else
        res.status(404).send('Author not found');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
