var mongoose = require('../mongoose');

var schema = new mongoose.Schema({
    website: String,
    social_id: String,
    name: String,
    email: String,
    creatdate: Date,
    status: String
});

exports.User = mongoose.model('User', schema);