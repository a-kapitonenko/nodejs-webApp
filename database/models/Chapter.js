var mongoose = require('mongoose');
var ChapterSchema = new mongoose.Schema({
    number: Number,
    name: String,
    text: String,
    image: String
});
module.exports = mongoose.model('Chapter', ChapterSchema);