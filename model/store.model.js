const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        maxLength: 10
    },
    phoneCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    emailVerify: {
        // 0. inactive and 1. active
        type: Number,
        required: true
    },
    phoneVerify: {
       // 0. inactive and 1. active
       type: Number,
       required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    status: {
        // 0. inactive and 1. active
       type: Number,
       required: true
    }
})

const Store = new mongoose.model('Store', storeSchema);

module.exports = Store;