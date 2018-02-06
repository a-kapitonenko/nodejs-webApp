var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));
var Categories = require('./models/Categories.js');

Categories.create({name: "Thriller"}, function (err, post) {
    if (err) return next(err);
    console.log(post);
});
Categories.create({name: "Comedy"}, function (err, post) {
    if (err) return next(err);
    console.log(post);
});


/*  Categories.deleteMany({name: "Thriller"}, function (err, post) {
    if (err) return next(err);
    console.log(post);

}); 
 Categories.deleteMany({name: "Comedy"}, function (err, post) {
    if (err) return next(err);
    console.log(post);

});  */
module.exports = mongoose;