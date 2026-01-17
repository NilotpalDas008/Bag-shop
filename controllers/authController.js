const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generatetoken } = require("../utils/generatetoken");

module.exports.registerUser = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    const HashedPass = await bcrypt.hash(password, 10);
    let Existinguser = await userModel.findOne({ email: email });
    if (Existinguser) return res.status(400).send("user alerady exists");
    let user = await userModel.create({
      email,
      password: HashedPass,
      fullname,
    });

    let token = generatetoken(user);
    res.cookie("token", token);
    res.send("user created");
  } catch (err) {
    console.log(err);
  }
};

module.exports.loginUser = async function(req,res){
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        req.flash('error', 'email and password incorrect');
        return res.redirect('/');
      }

      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        req.flash('error', 'email and password incorrect');
        return res.redirect('/');
      }

      const token = generatetoken(user);
      res.cookie('token', token, { httpOnly: true });
      return res.redirect('/shop');
    } catch (err) {
      console.log(err);
      req.flash('error', 'login failed');
      return res.redirect('/');
    }

}

module.exports.logOut = function(req,res){
    res.cookie('token','');
    res.redirect('/');
};

