const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
    },

    created: {
        type: Date,
        default: Date.now()
    },

    updated: {
        type: Date,
        default: Date.now()
    },

    author: {
        type: Schema.Types.ObjectId, 
        ref: 'users' 
    },

    config: {
        type: Object
    }
})

module.exports = mongoose.model('projects', ProjectSchema)