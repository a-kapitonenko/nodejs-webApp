var User = require('../database/models/user').User;
var config = require('../config');
var verified = require('../boot/nodemailer').verified;

var randArray = [];

exports.register = function(req, res, next) {
    var data = req.body;
    User.findOne({ "email" : data.email.toLowerCase() }, function(err, user) {
        if (err) throw err;
        if (user) {
            res.send({
                "text" : "This email is already use!",
                "status" : "0"
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
                let rand = verified(data.email.toLowerCase());
                randArray.push(rand);
                console.log(randArray);
                res.send({
                    "text" : "Thank you fo registering. Please, confirm your account",
                    "status" : "1"
                });
                res.end();
            });
        }
    });    
};
exports.verify = function(req,res) {
    console.log(randArray);
    let rand = req.query.id;
    if(randArray.indexOf(rand) != -1){
        User.findOneAndUpdate({ email: req.query.email }, { isActive: true }, (error, user)=> {
            if(error) throw error;
            randArray.splice(randArray.indexOf(rand),1);
            console.log(randArray);
            res.sendfile("dist/index.html");
        });
    }else {
        res.send("<h1>Bad Request</h1>");
    }
}