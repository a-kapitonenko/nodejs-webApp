var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String, 
    description: String,
    updated_date: { type: Date, default: Date.now },
    tags: { type : Array , "default" : [] },
    chapters:[{
        number: Number,
        name: String,
        text: String,
        image: String
    }],
    image: String, 
    comments: [{
        id: Number,
        author: String,
        text: String,
        date: String,
        image: String,
        likes : { type : Number , "default" :0 },
        userslikes: {type : Array , "default" : [],
        }
    }]
});
module.exports = mongoose.model('Book', BookSchema);
