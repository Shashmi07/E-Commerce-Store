const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            productId: String,
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
