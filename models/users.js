const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: v => v.toLowerCase(),
    },
    password: {
        type: String,
        required: true,
        set: v => bcrypt.hashSync(v,10)
    },
    gender: {
        type: String,
        required: true,
        enum: ['male','female'],
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'de-active'],
        required: true,
        default: 'pending'
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;