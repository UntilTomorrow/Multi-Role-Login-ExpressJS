// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();

// Definisi lokasi file router
const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const homeRoutes = require('./src/routes/router-home');

// Configurasi library session
app.use(session({
    secret: 'Kintilodon',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  }));

// Configurasi dan  library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash());



//  folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));



// Routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/', homeRoutes);


//  port server
app.listen(5050, ()=>{
    console.log('Server Berjalan di Port : '+3000);
});
