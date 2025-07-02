import mongoose from "mongoose";

const assembliesSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    instructions: {
        type: String,
        required: true
    }
}<{
    timestamps: true
})

const Assemblies = mongoose.model("Assemblies", assembliesSchema);
export default Assemblies;