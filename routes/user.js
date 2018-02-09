var User = require('../database/models/user').User;

exports.getUser = function(req, res) {
    if(req.session.passport == undefined) {
        console.log("1");
    }
}
exports.getUsers = function(req, res) {
    User.find({}, (err, user)=> {
        res.send(200,JSON.stringify(user));
    });
}