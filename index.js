const express = require('express');
const bodyParser =  require('body-parser');
const session = require('express-session');

const app = express();

const connection = require('./database/database');
const usersController = require('./controllers/UsersController');


//view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

//bodyparser
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//session
app.use(session({
    secret: 'asdfghjklzxcvbnm',
    cookie: { maxAge: 3000000 }
}));

//db connection
connection.authenticate().then(()=>{
    console.log('DB conectada!');
}).catch((error)=>{
    console.log(error);
});

app.use('/', usersController);

app.get('/', (req, res)=>{
    res.render('index');
});


app.listen(3000, ()=>{
    console.log("servidor rodando!");
});


