var mongoose = require("mongoose");
var BankSchema = new mongoose.Schema({
    balance: { type: Number },
    spend: { type: Number },
    name: String,
    // customer:{
    //     id:{type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"},
    //         username:String
    // }
});
module.exports = mongoose.model("bank", BankSchema) ;