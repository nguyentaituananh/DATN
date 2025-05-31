import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    variant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }, 
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount_price: {
        type: Number,
        default: 0,
        min: 0
    }
},{
    timestamps: true
})

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;