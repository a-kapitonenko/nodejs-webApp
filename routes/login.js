var User = require('../database/models/user').User;

exports.post = function(req,res) {
    var data = req.body;
    console.log(req.body);
    User.findOne({ email : data.email }, function(err, user) {
        if(err) throw err;
        if(user) {
            if(!user.isActive) {
                res.send({
                    "send": "Email is not verifyed"
                });
            }else if(user.isBlocked) {
                res.send({
                    "send": "You have been baned!"
                });
            }else {
                if(user.validPassword(data.password)) {
                    req.session.userId = user._id;
                    console.log(req.session);
                    res.send({
                        "send": "success"
                    });
                }else{
                    res.send({
                        "send": "Wrong password!"
                    });
                }
            }    
        }
    });
}