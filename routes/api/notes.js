const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Note = require("../../models/Note");
const User = require("../../models/User");

// @route   GET api/notes/all
// @desc    Get all notes
// @access  Public
router.get('/', (req, res) => {
    Note.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ noNotessfound: 'No notes found' }));
  });

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
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user)
      
    const newNote = new Note({
        user: req.user._id,
        title: req.body.title,
        content: req.body.content
    })

    newNote.save().then(note => {
        
            res.json(note);
          
    })
    .catch(err => res.status(400).json(err))
  }
);

// @route   DELETE api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({user: req.useer.id}).then(user => {
        Note.findById(req.params.id)
        .then(note => {
            note.remove().then(() => res.json({success: "Note Deleted"}))
        })
        .catch(err => res.status(404).json({notFound: 'Note not found'}))
    })
})

module.exports = router;
