const express = require('express');
const data = require('./data.json');
const projects = data.projects.slice().reverse(); // show latest projects first

const app = express();

// define public folder as '/static'
app.use('/static', express.static('public'));

app.set('view engine', 'pug');
app.engine('.pug', require('pug').__express);


/**
 * display home page with projects from templateData
 */
app.get('/', (req, res) => {
    const templateData = { projects }
    res.render('index', templateData);
})

app.get('/projects', (req, res) => {
  res.redirect('/');
})



/**
 * Render about page
 */
app.get('/about', (req, res) => {
    res.render('about')
})


/**
 * render project from url parameter
 */
app.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const templateData = {
        project: projects[id]
    }
    if (templateData.project) { //if the project id points to a valid project
        res.render('project', templateData);
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
    
})


// Error handling
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);