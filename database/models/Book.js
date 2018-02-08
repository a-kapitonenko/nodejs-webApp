var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String, 
    description: String,
    updated_date: { type: Date, default: Date.now },
    tags: { type : Array , "default" : [] },
    chapters:{ type : Array , "default" : [] },
    image: String 
});
module.exports = mongoose.model('Book', BookSchema);
