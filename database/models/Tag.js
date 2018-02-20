var mongoose = require('mongoose');
var TagSchema = new mongoose.Schema({
    name: String,
    books:[String]
});
module.exports = mongoose.model('Tags', TagSchema);