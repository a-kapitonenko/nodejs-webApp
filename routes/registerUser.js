var User = require('../database/models/user').User;
var config = require('../config');
var verified = require('../boot/nodemailer').verified;
var rand;

exports.register = function(req,res,next) {
    var data = req.body;
    console.log(data);
    User.findOne({ "email" : data.email }, function(err, user) {
        if (err) throw err;
        if (user) {
            res.send({
                "send": "That email is already taken."
            });
            res.end();
        }else {
            var newUser = new User();
            newUser.email = data.email;
            newUser.password = newUser.generateHash(data.password);
            newUser.username = data.username;
            newUser.realname = "";
            newUser.role = "user";
            newUser.isActive = false;
            newUser.isBlocked = false;
            newUser.website = "fanfiction";
            newUser.social_id = null;
            newUser.creat_date = Date.now();
            newUser.save(function(err) {
                if (err) throw err;
                rand = verified(data.email);
                res.send({
                    "send": "send"
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