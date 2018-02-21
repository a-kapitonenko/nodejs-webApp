var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String, 
    description: String,
    updated_date: String,
    chapters:[{
        number: Number,
        name: String,
        text: String,
        image: String,
        rating: {type : Array , "default" : []}
    }],
    image: String, 
    comments: [{
        id: Number,
        author: String,
        text: String,
        date: String,
        image: String,
        likes : { type : Number , "default" :0 },
        userslikes: {type : Array , "default" : []}
    }]
}).index({'$**': 'text'});

module.exports = mongoose.model('Book', BookSchema);
