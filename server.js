const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('copyright', () =>
{
    return `copyright@ ${new Date().getFullYear()}`;
});

hbs.registerHelper('screamIt', (text) =>
{
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => 
{
    const log = `${new Date()} ${req.method} ${req.url}`;
    fs.appendFile('server.log', log, (err) =>
    {
        if(err)
        console.log('Can\'nt append to file!');
    });
    next();
});
app.use((req, res, next) =>
{
   res.render('maintanance.hbs'); 
   //console.log('Maintanance');
   
  
});
app.get('/', (req, res) => 
{
    res.render('view.hbs', 
    {
        pageTitle: 'Home Page',
        PageContent: 'Welcome to home page',
    })  
});
app.get('/about',(req,res) =>
{
    res.render('view.hbs', 
    {
        pageTitle: 'About Page',
        PageContent: 'This is for.....',
    }) 
});
app.get('/bad', (req,res) => 
{
    res.send(
    {
      message: 'This is a bad request: 404'     
    });
});

app.listen(3000);