var express=require('express');
var router=express.Router();
var userController=require('../controllers/userController');


//User Controller
router.get('/login',userController.login);
router.get('/logout',userController.logout);
router.get('/register',userController.register);
router.post('/register',userController.registerUser);


module.exports=router;