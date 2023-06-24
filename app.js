
const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const { data }  = require('./data.json');

const { projects } = data;

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.render('index', projects);
});

app.get('/about', (req, res) => {
    res.render('about', projects);
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    res.render('project', { projects, id: req.params.id } );
})

app.get('/layout', (req, res) => {
    res.render('layout', projects);
});

//error handling 

app.use((req, res, next) => {
    const err = new Error("The Page you're looking for does not exist.");
    console.log('404 error')
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render("page-not-found", {err});
        console.log("404");
        next();
    } else {
           err.status = 500;
        res.render("error", {err});
        console.log("500");
        next();
    }
});

app.listen(3000, () => {
    console.log("App is running on local:3000!");
});

