const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Note = mongoose.model('Note', NoteSchema)