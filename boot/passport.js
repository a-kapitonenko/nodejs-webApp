var config = require('../config');
var passport = require('passport');
var AuthVKStrategy = require('passport-vkontakte').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
//var User = require('../models/user').User;

module.exports = (app)=> {
    passport.use('facebook', new FacebookStrategy({
            clientID: config.get("FacebookAuth:clientID"),
            clientSecret: config.get("FacebookAuth:clientSecret"),
            callbackURL: config.get("FacebookAuth:callbackURL"),
            profileFields: config.get("FacebookAuth:profileFields")
        },(accessToken, refreshToken, profile, done)=> {
            /*User.findOne({'social_id': profile.id}, (err, user)=> {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user); 
                } else {
                    var newUser = new User();
                    newUser.website = "facebook";
                    newUser.social_id = profile.id;                             
                    newUser.name  = profile.name.givenName + " " + profile.name.familyName;
                    newUser.email  = profile.emails[0].value;
                    newUser.status = "ok";
                    newUser.creatdate = Date.now();
                    newUser.save((err)=> {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });*/
    }));
    passport.use('vk', new AuthVKStrategy({
        clientID: config.get("VkAuth:clientID"),
        clientSecret: config.get("VkAuth:clientSecret"),
        callbackURL: config.get("VkAuth:callbackURL")
    },(accessToken, refreshToken, params, profile, done)=> {
        /*User.findOne({'social_id': profile.id}, (err, user)=> {
            if (err)
                return done(err);
            if (user) {
                return done(null, user); 
            } else {
                var newUser = new User();
                newUser.website = "vk";
                newUser.social_id = profile.id;                             
                newUser.name  = profile.displayName;
                newUser.email  = params.email;
                newUser.status = "ok";
                newUser.creatdate = Date.now();
                newUser.save((err)=> {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });*/
    }));
    passport.use('twitter', new TwitterStrategy({
        consumerKey: config.get("twitterAuth:consumerKey"),
        consumerSecret: config.get("twitterAuth:consumerSecret"),
        callbackURL: config.get("twitterAuth:callbackURL"),
        include_email: true
    },(token, tokenSecret, params, profile, done)=> {
        /*User.findOne({'social_id': profile.id}, (err, user)=> {
            if (err)
                return done(err);
            if (user) {
                return done(null, user); 
            } else {
                var newUser = new User();
                newUser.website = "twitter";
                newUser.social_id = profile.id;                             
                newUser.name  = profile.displayName;
                newUser.email  = "private";
                newUser.status = "ok";
                newUser.creatdate = Date.now();
                newUser.save((err)=> {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });*/
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);

    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};