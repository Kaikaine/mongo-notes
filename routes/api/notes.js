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
    User.findById(req.user.id)
      .then(user => {
          res.json(user.notes);
      })
      .catch(err =>
        res.status(404).json({ noNotes: "No notes found with this user id" })
      );
  }
);

// @route   POST api/notes
// @desc    Create note
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
    User.findById(req.user.id)
    .then(user => {
      const newNote = {
        title: req.body.title,
        content: req.body.content
      }

      user.notes.unshift(newNote)

      user.save().then(user => res.json(user))
    })
  }
);

// @route   DELETE api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById(req.user.id).then(user => {

      if (
        user.notes.filter(
          note => note._id.toString() === req.params.id
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ noteNotExist: 'Note does not exist' });
      }

      const removeIndex = user.notes
      .map(note => note._id.toString())
      .indexOf(req.params.id)

      user.notes.splice(removeIndex, 1)

      user.save().then(user => res.json(user))
    })
    .catch(err => res.status(404).json({notFound: 'Error retrieving notes'}))
})

module.exports = router;
