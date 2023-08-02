
const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const { data }  = require('./data.json');

const { projects } = data;

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
   res.render('index', { projects } );
});

app.get('/about', (req, res) => {
    res.render('about',  { projects } );
});

app.get('/project/:id', (req, res) => {

    const { id } = req.params; 
    const projectData = projects[id]; 
    const {project_name} = projectData;
    const {description} = projectData;
    const {technologies} = projectData;
    const {live_link} = projectData;
    const {github_link} = projectData;
    const {image_urls} = projectData;
    const templateData = {project_name, description, technologies, live_link, github_link, image_urls};

    res.render('project', templateData);
});

app.get('/layout', (req, res) => {
    res.render('layout', { projects } );
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




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

