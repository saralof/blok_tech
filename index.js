const express = require('express')
const app = express()
const port = 3000
const path = require('path');

app.use(express.static('static'));

app.set('view engine', 'ejs');

app.set(view, view)
/*

app.get('/', (req, res) => res.render('pages/index'));


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/about', (req, res) => {
    res.send('this is about')
});

app.get('/contact', (req, res) => {
    res.send('There is contact information')
}); */

app.get('*', (req, res) => {
    res.send('Error 404: Page Not Found')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





