var mongoose=require('mongoose');
var bcrypt=require('bcryptjs'); //We need this to incrypt our username

//User Schema
var UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    }
});

//Here we are going to create variable which we can access it from outside
var User=module.exports=mongoose.model('User',UserSchema);

//Now we need to create all user functions(create, update, retive, and delete)
module.exports.createUser=function(newUser,callback){
//now we are going to use bcrypt to hash our password
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password=hash;
            newUser.save(callback);
        });
    });
}

