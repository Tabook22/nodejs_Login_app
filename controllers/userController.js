var User=require('../models/users');
module.exports={
    login:login,
    register:register,
    logout:logout,
    registerUser:registerUser
}

//Login function 
function login(req,res){
    //TODO:login code
     res.render('./pages/login',{layout:"./layouts/layout",expressFlash:req.flash('success_msg')});
}

//Register function 
errors=[];
function register(req,res){
    //TODO:Register code
     res.render('./pages/register',{errors:errors,layout:"./layouts/layout"});
}

//Logout function 
function logout(req,res){
    //TODO:Logout code
}

//Register New user function
function registerUser(req,res){
    var vname=req.body.name;
    var vemail=req.body.email;
    var vusername=req.body.username;
    var vpassword=req.body.password;
    var vpassword2=req.body.password2;

    // Validation the field which come from the form 
    req.checkBody('name','Name is required').notEmpty().isLength({min:4});
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','Username is required').notEmpty().isLength({min:4});
    req.checkBody('password','Password is required').notEmpty().isLength({min:4}).equals(req.body.password2);
    req.checkBody('password2','Passwords do not match').notEmpty();

    //Storing the validation errors
    var errors= req.validationErrors();

    if(errors){
        // here in the case of errors we open register page and pass the errors to it
        res.render('./pages/register',{layout:'./layouts/layout',
            errors:errors
        })
    }else{
        //Here we create a new object as an instance of the the user object, then each property of that object will hold the data stored inside the variables whic we declared them at the top of the page
       var newUser=new User({
           name:vname,
           email:vemail,
           username:vusername,
           password:vpassword
       });

       //User is a variable which was created inside the user model
       User.createUser(newUser,function(err,user){
           if(err) throw err;
           console.log(user);
       });

       //create a success message
       req.flash('success_msg','You are registered and can now login'); //this message can be used inside the login page
       res.redirect('/users/login');
    }

}

