var path = require('path');

module.exports = (app)=> {
    app.post('/registeruser', require('./registerUser').register);
    app.get('/verify', require('./registerUser').verify);
    app.post('/login', require('./login').post);
    app.get('/selectuser', require('./user').selectUser);
    app.get('/getusers', require('./user').getUsers);
    app.post('/blockuser', require('./user').blockUser);
    app.post('/unblockuser', require('./user').unblockUser);
    app.post('/setadmin', require('./user').setAdmin);
    app.post('/deleteuser', require('./user').deleteUser);
    app.get('/auth/facebook', require('./passport').facebook);
    app.get('/auth/facebook/callback', require('./passport').facebookCallback);
    app.get('/auth/vk', require('./passport').vk);
    app.get('/auth/vk/callback', require('./passport').vkCallback);
    app.get('/auth/twitter', require('./passport').twitter); 
    app.get('/auth/twitter/callback', require('./passport').twitterCallback);
    app.get('/logout', require('./user').logout); 
    app.get('/user/:id', require('./user').getUser); 
    app.get('*', (req, res) => { 
        res.sendFile(path.join(app.get('dirname'), '/dist/index.html')); 
    });
};