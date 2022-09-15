const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = mongoose.Schema({
    store_id: {
        type: String,
        required: true
    },
    product_title: {
        type: String,
        required: true
    },
    product_information: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    regular_price: {
        type: String,
        required: true
    },
    extra_price: {
        type: Number
    },
    total_price: {
        type: String
    },
    status: {
        // 0. inactive and 1. active 
        type: Number,
        required: true
    }

})

const Product = new mongoose.model('Product', productSchema);

module.exports = Product;