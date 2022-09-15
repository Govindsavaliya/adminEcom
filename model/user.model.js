const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
        required: true,
        maxLength: 10
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    wallet: {
        type: String,
        required: true
    },
    phoneVerify: {
        // 0. inactive and 1. active
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        // 0 .disactive and 1. active
        type: Number,
        required:true
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;