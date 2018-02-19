var User = require('../database/models/user').User;

exports.post = function(req,res) {
    User.findOne({ email : req.body.email }, function(err, user) {
        if(err) throw err;
        if(user && !user.social_id) {
            if(!user.validPassword(req.body.password)) {
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