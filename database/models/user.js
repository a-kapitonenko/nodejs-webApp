var mongoose = require('../mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String,
    isActive: Boolean,
    isBlocked: Boolean,
    website: String,
    social_id: String,
    creat_date: Date
});
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

exports.User = mongoose.model('User', userSchema);