const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require ('body-parser');
const slug = require('slug');
const myCss = {
    style : fs.readFileSync('static/css/styles.css','utf8')
};
const jquery = require('jquery');
const session = require('express-session'); 
const cookieParser = require('cookie-parser');

//database set-up
const mongodb = require('mongodb');
const mongoose = require('mongoose');
mongoose
.connect('mongodb://localhost:27017/datingapp', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=> console.log("DB Connected"))
.catch(err => {console.log( "DB Connection Error :" + err );
});

//schema set-up
let chatSchema = new mongoose.Schema({
    message: {
        type: String
    }
});
 
let berichten = mongoose.model('berichten', chatSchema);

let users = [{
    name: 'Jonny',
    age: 25,
    description: 'I am Jonny. I am looking for someone to take out into nature and have picknicks with.'
},
{
    name: 'Tonya',
    age: 19,
    description: 'I am Tonya Potter, I am new to dating and hope to explore it in a non-pressuring way.'

},
{
    name:'Codie',
    age: 29,
    description: 'My name is Codie. I am looking for someone to bond with for the long haul.'
}];



//express set-up
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.get('/chatoverview', (req, res) => 
berichten.find(function(err, messages){
    if (err) {
        console.log(err);
    }else{
        res.render('chatoverview', {myCss: myCss, users: users, messages: messages})
    }
}));
app.get('/chatwindow', (req, res) =>
berichten.find(function(err, messages){
    if (err) {
        console.log(err);
    }else{
        res.render('chatwindow', {myCss: myCss, users: users, messages: messages})
        console.log(messages);
    }
}));
app.get('/', (req, res) => res.render('index', {myCss: myCss}));
app.get('*', (req, res) => {res.send('Error 404: Page Not Found')});
app.post('/chatwindow', (req, res) =>{verstuur(req.body.message); res.redirect(req.originalUrl);});

function verstuur(msg){
    let berichtje = new berichten({message: msg});
    berichtje.save().then((err, doc) =>{ 
        if (!err || err.message.search('__v:0')){
            console.log('message send');
        } else {
            console.log('error during record insertion: ' + err);
        }
    });
};


app.listen(port, () => console.log(`Example app listening on port ${port}!`));