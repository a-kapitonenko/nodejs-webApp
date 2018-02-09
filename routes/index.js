var passport = require('passport');
var User = require('../database/models/user').User;
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app)=> {
    app.post('/registeruser', require('./registerUser').register);
    app.get('/verify', require('./registerUser').verify);
    app.post('/login', require('./login').post);
    app.get('/getuser', function(req, res) {
        if(req.user){
            res.send({
                "user": req.user.name,
                "status": "1"
            });
        }
        else{
            res.send({
                "user": "",
                "status": "0"
            });
        }
    });
    app.get('/getallusers', function(req, res) {
        User.find({}, (err, user)=> {
            res.send(200,JSON.stringify(user));
        });
    });
    app.post('/block',isBlocked,  urlencodedParser, (req, res)=>{
        req.body.forEach(buf => {
            User.findByIdAndUpdate(buf._id, {status: "blocked"}, (err, user)=> {});
        });
        res.send(200,"success");
    });
    app.post('/unblock',isBlocked,  urlencodedParser, (req, res)=>{
        req.body.forEach(buf => {
            User.findByIdAndUpdate(buf._id, {status: "ok"}, (err, user)=> {});
        });
        res.send(200,"success");
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { 
        scope : ['public_profile', 'email']
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/'
        }));
    app.get('/auth/vk', passport.authenticate('vk', { 
        scope : ['public_profile', 'email']
            }));
    app.get('/auth/vk/callback',
        passport.authenticate('vk', {
            successRedirect : '/',
            failureRedirect : '/'
        }));
    app.get('/auth/twitter', passport.authenticate('twitter',{
        include_email: true
    })); 
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/'
    }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    }); 
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
function isBlocked(req, res, next) {
    if (!req.isAuthenticated() || req.user.status != "blocked"){
        return next();
    }
    res.sendfile('public/banPage.html');
}