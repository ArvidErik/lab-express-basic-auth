const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;


router.get('/main', (req,res,next)=>{
    res.render("users/main", { userInSession: req.session.currentUser })
})

router.get('/private', (req,res,next)=>{
    res.render("users/private", { userInSession: req.session.currentUser })
})




module.exports = router;
