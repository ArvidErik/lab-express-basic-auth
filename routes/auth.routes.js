const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      console.log(`Password hash: ${hashedPassword}`);
      return User.create({
        username,
        password: hashedPassword,
      })
    })
    .then((data) => {
      console.log("user has been created :", data);
      res.redirect("/");
    })
    .catch((error) => next(error));
});

module.exports = router;
