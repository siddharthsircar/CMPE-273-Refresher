// Using Require
var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/login', (req, res) => {
    res.render('login.html');
});

app.get('/register', (req, res) => {
    res.render('register.html');
});

app.get('/profile', (req, res) => {
    res.render('profile.html');
});

app.get('/todo', (req, res) => {
    res.render('todo.html');
});


var server = app.listen(3000, function () {
    console.log("Server listening on port 3000");
});