const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db.js');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const app=express();
const passport=require('passport');
const session=require('express-session');
const {mongo} = require('mongoose');
const mongoose=require('mongoose');
const { options } = require('./routes/index');
//load config
dotenv.config({path:'./config/config.env'});

//connect database
connectDB();

app.use(morgan('tiny'));

app.use(express.static('public'))

//passport config

require('./config/passport')(passport);

const {formatDate}=require('./helpers/hbs')

//middleware

app.engine('handlebars', exphbs.engine({helpers:{
formatDate
}, 
defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//@desc session setup

app.use(session({ secret: 'keyboard cat',
 resave: false, 
 saveUninitialized: false}));

//passport middle ware
app.use(passport.initialize());
app.use(passport.session());



app.use(express.urlencoded({ extended: false }));-
app.use(express.json());


app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));



const PORT=process.env.PORT||5000;

app.listen(PORT,(req,res)=>{
    console.log(`server runing in ${PORT}`);
});

