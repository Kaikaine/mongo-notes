const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load user model
const User = require("../../models/User");
require("../../config/passport")(passport);

// route    POST api/users/register
// desc     register a user
// access   public
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

// route    GET api/users/all
// desc     shows all users
// access   public
router.get('/all', (req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(404).json({error: 'No users found'}))
})

// route    POST api/users/login
// desc     Login user / return jwt token
// access   public
router.post('/login', (req,res) => {
    User.findOne({name: req.body.name}).then(user => {
        // check password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user._id,
                    name: user.name
                }

                jwt.sign(payload, keys.secret, {expiresIn: 3600}, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json({error: 'Password incorrect'})
            }
        })
    })
    .catch(err => console.log(err))
})

// route    GET api/users/current
// desc     Return current user
// access   private
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
      });
    }
  );
  
  module.exports = router;