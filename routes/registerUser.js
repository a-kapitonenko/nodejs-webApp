var User = require('../database/models/user').User;
var config = require('../config');
var verified = require('../boot/nodemailer').verified;
var rand;

exports.register = function(req,res,next) {
    var data = req.body;
    User.findOne({ 'email' : data.email }, function(err, user) {
        if (err)  throw err;
        if (user) {
            res.send({
                "send": 'That email is already taken.'
            });
            res.end();
        } else {
            var newUser = new User();
            newUser.website = "fanfiction";
            newUser.email = data.email;
            newUser.name = data.name;
            newUser.password = newUser.generateHash(data.password);
            newUser.status = "ok";
            newUser.active = "false";
            newUser.creatdate = Date.now();
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
        User.findOneAndUpdate({email: req.query.email}, {active: "true"}, (error, user)=> {
            if(error) throw error;
            res.sendfile('dist/index.html');
        });
    }
    else{
        res.end("<h1>Bad Request</h1>");
    }
}