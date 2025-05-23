
const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const { data }  = require('./data.json');
const  projects   = data.projects;
const  designs  = data.designs;
// console.log(projects);
// console.log(designs);
// if (!Array.isArray(projects) || projects.length === 0) {
//     console.error("Error: 'projects' is not defined or is empty in data.json");
// }


app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log({ projects })
   res.render('index',  { projects }  );
   console.log({ projects })
});

app.get('/about', (req, res) => {
    res.render('about',  { projects } );
});

app.get('/project/:id', (req, res) => {
    const { id } = req.params; 
    const projectData = data.projects[id]; 
    const designData = data.designs[id];
    if (!projectData) {
        return res.status(404).render('error', { error: 'Project not found' });
    }
    const {project_name} = projectData;
    const {description} = projectData;
    const {technologies} = projectData;
    const {live_link} = projectData;
    const {github_link} = projectData;
    const {image_urls} = projectData;
    const templateData = {project_name, description, technologies, live_link, github_link, image_urls};

    const {design_name} = designData;
    const {desdescription} = designData;
    const {destechnologies} = designData;
    const {deslive_link} = designData;
    const {desgithub_link} = designData;
    const {desimage_urls} = designData;
    const destemplateData = {design_name, desdescription, destechnologies, deslive_link, desgithub_link, desimage_urls};
    if (designData) {
        const { design_name, desdescription, destechnologies, deslive_link, desgithub_link, desimage_urls } = designData;
        const destemplateData = { design_name, desdescription, destechnologies, deslive_link, desgithub_link, desimage_urls };
        res.render('project', { templateData, destemplateData });
    } else {
        res.render('project', { templateData });
    }
    // res.render('project', {templateData, destemplateData});
});


app.get('/layout', (req, res) => {
    res.render('layout', { dataProjects } );
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

