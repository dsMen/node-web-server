const express = require('express');
const hbs = require('hbs'); //handlebars
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();



hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         welcomeMsg: `Our website is under maintenance`,
//         body: `We will be back soon.`,
//         currentYear: new Date().getFullYear()
//     });
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log',log + '\n',(e) => {
        if(e){
            console.log('Unable to append server.log');
        }
    });
    console.log(log);
   // console.log(req);
    next();
});
// helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// set up handler to https request
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: `Welcome to Dina Samy's website`,
        body: `Home Page of new website Technology used is express nodejs`
    });
});
//about
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMsg: `About Us`,
        body: `This is an about us page`
    });
});
// bad request
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill your request'
    });
});
// projects page
app.get('/projects',(req, res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects',
        welcomeMsg: `My portfolio`,
        body: `My online portfolio.`
    });
});
// bind the app to port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
