var User = require('../database/models/user').User;

exports.selectUser = (req, res)=> {
    if(req.session.passport != undefined) {
        User.findById(req.session.passport.user, (err, user)=> {
            user.password = null;
            res.json(user);
        });
    }else {
        res.send("null");
    }
}
exports.getUsers = (req, res)=> {
    User.find({}, (err, user)=> {
        res.json(user);
    });
}
exports.logout = (req, res)=> {
    req.session.passport = undefined;
    res.end();
}

exports.blockUser = (req, res)=> {
    req.body.forEach(buf => {
        User.findByIdAndUpdate(buf._id, {isBlocked: true}, (err, user)=> {});
    });
    res.end();
}
exports.unblockUser = (req, res)=> {
    req.body.forEach(buf => {
        User.findByIdAndUpdate(buf._id, {isBlocked: false}, (err, user)=> {});
    });
    res.end();
}
exports.setAdmin = (req, res)=> {
    req.body.forEach(buf => {
        User.findByIdAndUpdate(buf._id, {role: "admin"}, (err, user)=> {});
    });
    res.end();
}
exports.deleteUser = (req, res)=> {
    req.body.forEach(buf => {
        User.findByIdAndRemove(buf._id, (err, user)=> {});
    });
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