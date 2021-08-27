const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema({
    title: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('categories', CategorySchema);