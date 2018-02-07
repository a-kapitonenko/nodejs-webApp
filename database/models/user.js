var mongoose = require('../mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    website: String,
    social_id: String,
    name: String,
    email: String,
    password: String,
    creatdate: Date,
    active: String,
    status: String
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

exports.User = mongoose.model('User', userSchema);