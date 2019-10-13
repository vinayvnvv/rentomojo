const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    date: { type: Date, default: Date.now }
});

module.exports = {
    userSchema,
    userModel: mongoose.model("users", userSchema)
};
