import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }
})

const Favorite = mongoose.model('Favorite', FavoriteSchema);
export default Favorite;