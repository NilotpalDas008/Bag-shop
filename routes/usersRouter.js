const express = require('express');
const router = express.Router();
const{registerUser , loginUser ,logOut} = require('../controllers/authController');
router.get('/',(req,res)=>{
    res.send('users');
}) ;
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logOut);
router.get('/logout', logOut);

module.exports = router;