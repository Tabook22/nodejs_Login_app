module.exports={
    login:login,
    register:register,
    logout:logout,
    registerUser:registerUser
}

//Login function 
function login(req,res){
    //TODO:login code
     res.render('./pages/login',{layout:"./layouts/layout"});
}

//Register function 
function register(req,res){
    //TODO:Register code
     res.render('./pages/register',{layout:"./layouts/layout"});
}

//Logout function 
function logout(req,res){
    //TODO:Logout code
}

//Register New user function
function registerUser(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var username=req.body.username;
    var password=req.body.password;
    var password2=req.body.password2;

    // Validation
    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('password','Password is required').notEmpty();
    req.checkBody('password','Password is required').equals(req.body.password);

    var errors= req.validationErrors();

    if(errors){
        res.render('users/register',{
            errors:errors
        })
    }else{
        cos
    }

}

