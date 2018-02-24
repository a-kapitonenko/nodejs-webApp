var User = require('../database/models/user').User;

exports.selectUser = (req, res)=> {
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
exports.getUsers = (req, res)=> {
    User.find({}, (err, user)=> {
        res.send(200,JSON.stringify(user));
    });
}
exports.logout = (req, res)=> {
    req.session.passport = undefined;
    res.end();
}

exports.getUser = (req, res)=> {
    User.findById(req.params.id, (err, user)=> {
        console.log(req.params.id);
        res.json(user);
    });
} 

exports.saveUser = (req, res)=> {
    User.findByIdAndUpdate(req.params.id,{image: req.body.image, username:req.body.username }, (err, user)=> {
        res.json(user);
    });
} 