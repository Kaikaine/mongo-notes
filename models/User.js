const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [
        {
            title: {
                type: String,
            },
            content: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('User', UserSchema)