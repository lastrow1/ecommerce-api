import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    products: [{
        productId: {
            type: String,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
},
    {
        timestamps: true
    }
);

const cart = mongoose.model('Cart', cartSchema);

export default cart;