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
      });
    })
    .then((data) => {
      console.log("user has been created :", data);
      res.redirect("/login");
    })
    .catch((error) => next(error));
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        console.log("Username not registered. ");
        res.render("auth/login", {
          errorMessage: "User not found and/or incorrect password.",
        });
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect("/userProfile");
      } else {
        console.log("Incorrect password. ");
        res.render("auth/login", {
          errorMessage: "User not found and/or incorrect password.",
        });
      }
    })
    .catch((error) => next(error));
});

router.get("/userProfile", (req, res) => {
  res.render("users/user-profile", { userInSession: req.session.currentUser });
});

module.exports = router;
