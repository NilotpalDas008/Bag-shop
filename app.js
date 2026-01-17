const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const  path = require('path');
const db = require('./config/mongoose-conection')
const productsRouter=require('./routes/productsRouter');
const userRouter=require('./routes/usersRouter');
const ownersRouter=require('./routes/ownersRouter');
const indexRouter = require('./routes/index');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public'))) ;
app.set('view engine','ejs');
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || 'dev-secret',
  })
);

app.use(flash());



app.use('/', indexRouter);
app.use('/owners',ownersRouter);
app.use('/users',userRouter);
app.use('/products',productsRouter)
app.listen(3000);                                   