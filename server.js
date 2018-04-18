const express = require('express');
const hbs = require('hbs'); //handlebars
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();



hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Under Maintenance',
        welcomeMsg: `Our website is under maintenance`,
        body: `We will be back soon.`,
        currentYear: new Date().getFullYear()
    });
});

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
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
// set up handler to https request
app.get('/', (req, res) => {
    //   res.send(`Deena's First NodeJs App!`);
    //   res.send({
    //       name: 'Deena',
    //       likes: [
    //           'coffee',
    //           'code',
    //           'traveling'
    //       ],
    //       slang: 'Express is Owesome!'
    //   });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: `Welcome to Dina Samy's website`,
        body: `Home Page of new website Technology used is express nodejs`,
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMsg: `About Us`,
        body: `This is an about us page`,
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill your request'
    });
});

// bind the app to port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
