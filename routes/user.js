var User = require('../database/models/user').User;

exports.selectUser = function(req, res) {
    if(req.session.passport != undefined) {
        User.findById(req.session.passport.user, (err, user)=> {
            user.password = null;
            res.json(user);
        });
    }else {
        res.send("null");
        console.log("null");
    }
}
exports.getUsers = function(req, res) {
    User.find({}, (err, user)=> {
        res.send(200,JSON.stringify(user));
    });
}