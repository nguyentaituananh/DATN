import mongoose from "mongoose";

const careInstructionsSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    content:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const CareInstructions = mongoose.model("CareInstructions", careInstructionsSchema);
export default CareInstructions;