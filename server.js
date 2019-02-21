//Add about, home and project links in home page 


const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000
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
/*app.use((req, res, next) =>
{
   res.render('maintanance.hbs'); 
   //console.log('Maintanance');
   
  
});*/
app.get('/', (req, res) => 
{
    res.render('home.hbs', 
    {
        pageTitle: 'Home Page',
        PageContent: 'Welcome to home page',
    })  
});
app.get('/about',(req,res) =>
{
    res.render('about.hbs', 
    {
        pageTitle: 'About Page',
        PageContent: 'This is for.....',
    }) 
});
app.get('/project',(req,res) =>
{
    res.render('project.hbs', 
    {
        pageTitle: 'Project Page',
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

app.listen(port , ()=>
{ 
    console.log(`Server is up on port ${port}`);
});