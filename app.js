
const express = require('express');

const app = express();

// const path = require('path');

const data = require('./data.json');


app.use('/static', express.static('public'));

app.listen(3000, () => {
    console.log("App is running on local:3000");
});

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', data);
});

app.get('/about', (req, res) => {
    res.render('about', data);
});

app.get('/project', (req, res) => {
    res.render('project', data);
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    res.render('project', { data, id: req.params.id } );
})

app.get('/layout', (req, res) => {
    res.render('layout', data);
});