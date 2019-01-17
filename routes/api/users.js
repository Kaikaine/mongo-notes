const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load user model
const User = require("../../models/User");
require("../../config/passport")(passport);

router.post('/register', (req, res) => {
    User.findOne({name: req.body.name}).then(user => {
        if(user) {
            return res.status(400).json({error: 'Username already taken'})
        }

        const newUser = new User({
            name: req.body.name,
            password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.json(user);
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });
    })
})