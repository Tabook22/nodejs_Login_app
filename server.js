var express=require('express');
var ejsLayouts = require("express-ejs-layouts");
var path=require('path');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var ejs=require('ejs');
var expressValidator=require('express-validator');
var flash=require('connect-flash');//The flash is a special area of the session used for storing messages.
var session=require('express-session');
var passport=require('passport');
var localStrategy=require('passport-local'),Strategy; //This module lets you authenticate using a username and password in your Node.js applications, because our username and password stored in our database
var mongodb=require('mongodb');
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db=mongoose.connection;

//Routes
var routes=require('./routes/index');

//Init App
var app=express();

//View engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(ejsLayouts);

//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator()); //here am using expressValidator as a method, and notice it should be alter body parser, becuse it need to access the parsed valued to check them
app.use(cookieParser());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Express session
app.use(session({
    secret:'secret',
    saveUninitialized:false, //if it' true that means make sure that our session is stored at session storage event if it's not yet initialized, but here we set it to false, save it only if it is inizlized
    resave:false //if it is true means save our session after each requiest event if is not yet intialized, but we set it to false to save session only if it we change some thing
}));

//Passport Init
app.use(passport.initialize());
app.use(passport.session());

//Express validator
// app.use(expressValidator({
//   errorFormatter: function(param, msg, value) {
//       var namespace = param.split('.')
//       , root    = namespace.shift()
//       , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param : formParam,
//       msg   : msg,
//       value : value
//     };
//   }
// }));


//Connect flash we must set it after we set our session and cookies
//The flash is a special area of the session used for storing messages. Messages are written to the flash and 
//cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring 
//that the message is available to the next page that is to be rendered.
app.use(flash());

//Global vars for our flash messages
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success-msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error'); // this we use it because passport sets its own messages an errorss
    res.locals.user=req.user || null; // if the user is there we will be able to access it from any where otherwise it is  null
    next();
});

// Some middleware for our routes
app.use('/', routes);
app.use('/users',routes);

//set the port and start the server
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'),function(){
    console.log('Server started on port '+app.get('port'));
});