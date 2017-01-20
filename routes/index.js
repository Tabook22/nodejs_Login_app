var express=require('express');
var router=express.Router();
//var userController=require('../controllers/userController');

//Get Homepage
router.get('/', function(req,res){
    res.render('./pages/index',{layout:'./layouts/layout'});
});

// //User Controller
// router.get('/login',userController.login);
// router.get('/logout',userController.logout);
// router.get('/register',userController.register);
// router.post('/register',userController.registerUser);

module.exports=router;