var User = require('../database/models/user').User;

exports.post = function(req,res) {
    var data = req.body;
    User.findOne({ email : data.email }, function(err, user) {
        if(err) throw err;
        if(user) {
            if(!user.validPassword(data.password)) {
                res.send({
                    "send": "Wrong password!"
                });
            }else if(user.isBlocked) {
                res.send({
                    "send": "You have been baned!"
                });
            }else if(!user.isActive) {
                res.send({
                    "send": "Email is not verifyed"
                });
            }else {
                req.session.passport = {};
                req.session.passport.user = user._id;
                res.json(user);
            }
        }else {
            res.send({
                "send": "Wrong email!"
            });
        }
    });
}