var mongoose = require("mongoose");
var bank = require("./bank");
var passportLocalMongoose = require("passport-local-mongoose")
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    bank: {
        
            type: mongoose.Schema.Types.ObjectId,
            ref:"bank"},
    balance:{type:Number,default:0}
});
userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema)