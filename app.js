const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

//ejs setup
app.set('view engine', 'ejs');

app.use(express.static('public'));

// parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Display form
app.get('/', (req, res) => 
{
    res.render('index', { joke: null, name: null });
});

//input form response and get joke
app.post('/joke', (req, res) => 
{
    const userName = req.body.name;

    // get random joke unless there is one for name
    axios.get('https://official-joke-api.appspot.com/random_joke')
        .then(response => 
        {
            const joke = response.data;
            // put joke on page
            res.render('index', { joke: joke, name: userName });
        })
        //error handling
        .catch(error => 
        {
            console.error(error);
            res.send('Error fetching joke. Please try again later.');
        });
});

//server
app.listen(3000, () => 
{
    console.log('Server on http://localhost:3000');
});
