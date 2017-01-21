var express=require('express');
var router=express.Router();
var userController=require('../controllers/userController');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy; //we are using a local strategy becasue we have alocal database
var User=require('../models/users');
//----------------------------------------------------------------------------------------------------------
//It is important to determain the strategy, before using passport, becasue passport uses strategy 
//to authenticate requests.Ok here we are going to use local strategy because the usernames and passwordd stored inside our database,not like facebook or twitter strategies, where the username and password not stored in our database
//notice there are more strategyies for example there is a strategy for using facebook, twitter, google, and so on 

//The local authentication strategy authenticates users using a username and password. 
//The strategy requires a verify callback, which accepts these credentials and calls done providing a user.
passport.use(new LocalStrategy(
  function(username, password, done) {
      //here we have created a function in the model called getUserByUsername and we use it to check for the user name
    User.getUserByUsername(username, function(err,user){
        if(err) throw err;
        if(!user){
            return done(null, false,{message:'Unknown User'});
        }
        //here we create another function inside the model and we call it comparePassword
        User.comparePassword(password,user.password,function(err,isMatch){
           if(err) throw err;
           if(isMatch){
               return done(null, user);
           }else{
               return done(null, false, {message:'Invalid password'});
           }
        });
    });
  }));

//serilize user and deserialize user --------------------------------------------------------------------------
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//Get Homepage-------------------------------------------------------------------------------------------------
router.get('/',ensureAuthenticated, function(req,res){
    res.render('./pages/index',{layout:'./layouts/layout'});

});

//User Controller-----------------------------------------------------------------------------------------------
router.get('/login',userController.loginGet);
router.post('/login', 
  passport.authenticate('local',{successRedirect:'/', failureRedirect:'/users/login',failurFlash:true}),
  userController.loginPost
  );
//router.post('/login',userController.loginPost); //here we are making a post request to login, and we have a paramter of passport.authenticate and we are using a local strategy, because we are using a local database
router.get('/logout',userController.logout);
router.get('/register',userController.register);
router.post('/register',userController.registerUser);


//this function we use it to ensure that an authenticated user can go to the dashboar (e.g index)
//to use this function which we created, we can use it as a second parameter in our route to get index page
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next(); //means just continue to the next function
    }else{
        req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}
module.exports=router;