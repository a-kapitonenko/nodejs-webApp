var passport = require('passport');

exports.facebook = passport.authenticate('facebook', { 
    scope : ['public_profile', 'email']
});
exports.facebookCallback = passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/'
});
exports.vk = passport.authenticate('vk', { 
    scope : ['public_profile', 'email']
});
exports.vkCallback = passport.authenticate('vk', {
    successRedirect : '/',
    failureRedirect : '/'
});
exports.twitter = passport.authenticate('twitter',{
    include_email: true
});
exports.twitterCallback = passport.authenticate('twitter', {
    successRedirect : '/',
    failureRedirect : '/'
});