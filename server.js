const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); //injeta hbs como view engine

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => { //.use() como registra um middleware
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.path}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.');
        }
    });

    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render( 'maintenance.hbs', {
//         pageTitle: 'maintenance',
//         msg: 'The app is under maintenance. Please come back soon.'
//     });
// });

app.use(express.static(__dirname + '/public')); //usando a var __dirname eh pego o dir onde estamos da app

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Felipe',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });

    res.render('home.hbs', {
        dirName: __dirname,
        title: 'home',
        pageTitle: 'Home',
        welcomeMsg: 'Bem vindo ao curso de nodejs',
        info: 'Estou usando hbs para renderizar essa pagina'
    });
});

app.get('/about', (req, res) => {
    //res.send('About page');
    res.render('about.hbs', {
        title: 'about',
        pageTitle: 'Felipe about page'
    });
});

app.get('/new', (req, res) => {
    res.render('new.hbs', {
        info: 'Deploying the app do heroku',
        pageTitle: 'Heroku test',
        title: 'heroku'
    });
});


app.get('/bad', (req, res) => {
    res.send({errorMessage: 'Bad request!'});
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});