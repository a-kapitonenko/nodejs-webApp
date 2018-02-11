module.exports = (app)=> {
    app.post('/registeruser', require('./registerUser').register);
    app.get('/verify', require('./registerUser').verify);
    app.post('/login', require('./login').post);
    app.get('/selectuser', require('./user').selectUser);
    app.get('/auth/facebook', require('./passport').facebook);
    app.get('/auth/facebook/callback', require('./passport').facebookCallback);
    app.get('/auth/vk', require('./passport').vk);
    app.get('/auth/vk/callback', require('./passport').vkCallback);
    app.get('/auth/twitter', require('./passport').twitter); 
    app.get('/auth/twitter/callback', require('./passport').twitterCallback);
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    }); 
};