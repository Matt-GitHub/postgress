const express = require("express");
const users = require("../models/user-model");
const bcrypt = require("bcryptjs");
const generateToken = require("./token");
const jwt = require("jsonwebtoken");
const router = express();

router.use(express.json());

router.get("/users", (req, res) => {
  users
    .getUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Cannot get users at this time" });
    });
});

router.post("/register", (req, res) => {
  const userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 12);
  userData.password = hash;
  users
    .register(userData)
    .then(newUser => {
      res.status(201).json({ message: "new user created" });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "having issues creating a new user at this time"
      });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  users
    .login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ errorMessage: "invalid credentials" });
      }
    })
    .catch(err => {
      console.log("login error", err);
      res.status(500).json({
        errorMessage:
          "having issues with our login service, please check back later"
      });
    });
});

module.exports = router;
