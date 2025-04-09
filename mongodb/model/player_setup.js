const mongoose = require('mongoose')

const PlayerSetupSchema = new mongoose.Schema({
    id_tnm: {
        type: String,
        required:true,
    },
    customer_number: {
        required: true,
        type: String,
    },
    customer_name:{
        required:true,
        type:String
    },
    customer_name_full:{
        required:true,
        type:String,
    },
    round:{
        required:true,
        type:Number,
    },
    machine:{
        required:true,
        type:Number
    },
    fee:{
        required:true,
        type:String,
        default:"200",
    },
    remark:{
        type:String,
        required: false,
    },
    play_count:{
        required:true,
        type:Number,
        default:0,
    },
    available:{
        required:true,
        type:Boolean,
        default:true,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
})



const PlayerSetup = mongoose.model("player_setups", PlayerSetupSchema);
module.exports = PlayerSetup;
