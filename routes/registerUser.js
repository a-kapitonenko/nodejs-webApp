var User = require('../database/models/user').User;
var config = require('../config');
var verified = require('../boot/nodemailer').verified;
var rand;

exports.register = function(req, res, next) {
    var data = req.body;
    User.findOne({ "email" : data.email.toLowerCase() }, function(err, user) {
        if (err) throw err;
        if (user) {
            res.send({
                "text": "Эта почта уже используется",
                "status": "0"
            });
            res.end();
        }else {
            var newUser = new User();
            newUser.email = data.email.toLowerCase();
            newUser.password = newUser.generateHash(data.password);
            newUser.username = data.username;
            newUser.realname = "";
            newUser.role = "user";
            newUser.isActive = false;
            newUser.isBlocked = false;
            newUser.website = "fanfiction";
            newUser.social_id = null;
            newUser.creat_date = Date.now();
            newUser.image = data.image;
            newUser.save(function(err) {
                if (err) throw err;
                rand = verified(data.email.toLowerCase());
                res.send({
                    "text": "Благодарим за регистрацию. Вам на почту было отправлено письмо для подтверждения аккаунта",
                    "status": "1"
                });
                res.end();
            });
        }
    });    
};
exports.verify = function(req,res) {
    if(req.query.id == rand){
        User.findOneAndUpdate({ email: req.query.email }, { isActive: true }, (error, user)=> {
            if(error) throw error;
            res.sendfile("dist/index.html");
        });
    }else {
        res.end("<h1>Bad Request</h1>");
    }
}