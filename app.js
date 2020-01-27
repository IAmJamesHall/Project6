const express = require('express');
const data = require('./data.json');

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const templateData = {
        projects: data.projects
    }
    res.render('index', templateData);
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const templateData = {
        project: data.projects[id]
    }
    if (templateData.project) {
        res.render('project', templateData);
    } else {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
    
})


app.use((req, res, next) => {
    
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);