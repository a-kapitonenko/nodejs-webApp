var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../database/models/Book.js');
var Categories = require('../database/models/Categories.js');
var User = require('../database/models/user').User;



/* var server = require('http').createServer(app);
var io = require('socket.io')(server); */

//import controller file
/*import * as todoController from '../controllers/bookcontroller';

router.route('/')
     .get(todoController.getTodos);
router.route('/:id')
      .get(todoController.getTodo);
 router.route('/')
      .post(todoController.createBook);
 router.route('/:id')
       .put(todoController.updateBook);
 router.route('/:id')
       .delete(todoController.deleteBook); */
/* 
});*/
/* server.listen(4000);
// socket io
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
      console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
      console.log(data);
      io.emit('new-message', { message: data });
    });
  }); */

router.get('/', function(req, res, next) {
    Book.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
    // User.findByIdAndRemove(req.session.passport.user, (err, user)=> {
    //     res.json(user);
    // });
    
});

router.get('/categories', function(req, res, next) {
    
    Categories.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

 router.get('/:id', function(req, res, next) {
    Book.findById( req.params.id , function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


router.post('/', function(req, res, next) {
    Book.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


router.put('/:id', function(req, res, next) {
    Book.findByIdAndUpdate( req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


router.delete('/:id', function(req, res, next) {
    Book.findByIdAndRemove( req.params.id , req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
}); 
 
module.exports = router;