const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Note = require("../../models/Note");
const User = require("../../models/User");

// @route   GET api/notes
// @desc    Get notes
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.find()
      .sort({ date: -1 })
      .then(note => {
        if (note.user == User._id) {
          res.json(note);
        }
      })
      .catch(err =>
        res.status(404).json({ noNotes: "No notes found with this user id" })
      );
  }
);

// @route   POST api/notes
// @desc    Create note
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      
    const newNote = new Note({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content
    })

    newNote.save().then(note => {
        if (note.user == User._id) {
            res.json(note);
          }
    })
  }
);

module.exports = router;
