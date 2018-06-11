var mongoose=require("mongoose")
var foodieSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: { type: Number },
    username:{
        id:{type:mongoose.Schema.Types.ObjectId,
        ref:"User"},
        username:String
    },
    bank:{
        id:{type:mongoose.Schema.Types.ObjectId,
        ref:"bank"},
        balance:Number,
        spend:Number
    },
    created: { type: Date, default: Date.now }
});
module.exports = mongoose.model("foodie", foodieSchema);