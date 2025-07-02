import mongoose from "mongoose";

const BannersSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true
    },
    link_to:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    }
})

const Banners = mongoose.model('Banners', BannersSchema);
export default Banners;