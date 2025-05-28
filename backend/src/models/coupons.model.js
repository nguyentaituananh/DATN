import mongoose from "mongoose";

const CouponsSchema = mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    discount_percent:{
        type:Number,
        required:true
    },
    valid_from:{
        type:Date,
        required:true
    },
    valid_to:{
        type:Date,
        required:true
    },
    usage_limit:{
        type:Number,
        required:true
    }
})

const Coupons = mongoose.model('Coupons', CouponsSchema);
export default Coupons;