const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    title: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'public'
    },
    allowComments: {
        type: Boolean,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    file: {
        type: String
    }
});

module.exports = mongoose.model('posts', PostSchema);