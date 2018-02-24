var User = require('../database/models/user').User;

exports.post = function(req,res) {
    User.findOne({ email : req.body.email.toLowerCase() }, function(err, user) {
        if(err) throw err;
        if(user) {
            if(user.social_id) {
                res.send({
                    "text": "Эта почта используется другим пользователем!",
                    "status": "0"
                });
                res.end();
            }else if(!user.validPassword(req.body.password)) {
                res.send({
                    "text": "Неверный пароль!",
                    "status": "0"
                });
                res.end();
            }else if(user.isBlocked) {
                res.send({
                    "text": "Ваш аккаунт был заблокирован!",
                    "status": "0"
                });
                res.end();
            }else if(!user.isActive) {
                res.send({
                    "text": "Ваш аккаунт не подтвержден!",
                    "status": "0"
                });
                res.end();
            }else {
                req.session.passport = {};
                req.session.passport.user = user._id;
                res.json(user);
                res.end();
            }
        }else {
            res.send({
                "text": "Неверный  email!",
                "status": "0"
            });
            res.end();
        }
    });
}