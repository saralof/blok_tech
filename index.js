const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require ('body-parser')
const slug = require('slug')
const myCss = {
    style : fs.readFileSync('static/css/styles.css','utf8')
};
const jquery = require('jquery');

//database set-up
const mongodb = require('mongodb')
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
app.get('/chatwindow', (req, res) =>
berichten.find(function(err, messages){
    if (err) {
        console.log(err);
    }else{
        res.render('chatwindow', {myCss: myCss, messages: messages})
        console.log(messages);
    }
}));

//express set-up
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.get('/chatoverview', (req, res) => res.render('chatoverview', {myCss: myCss}));
//app.get('/chatwindow', (req, res) => res.render('chatwindow', {myCss: myCss, chatSchema: chatSchema, mytext: 'hello'}));

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
} 


app.listen(port, () => console.log(`Example app listening on port ${port}!`));