var config = require('../config');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');

var transport = nodemailer.createTransport({
    service: config.get("nodemailer:service"),
    auth: {
        user: config.get("nodemailer:user"),
        pass: config.get("nodemailer:pass")
    }
});
exports.verified = function(email) {
    var rand = bcrypt.hashSync(email, bcrypt.genSaltSync(8), null);
    var link = "http://localhost:8080/verify/?id="+rand+"&email="+email;
    var mailOptions = {
        to : email,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    transport.sendMail(mailOptions, function(error, response) {
        if(error) throw error
        console.log("latter send");
    });
    return rand;
}