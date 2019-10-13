const mongoose = require("mongoose");
require("dotenv").config();
const user = require("./../schemas/user");
console.log(
    "db------>",
    process.env.MONGODB_HOST + process.env.MONGODB_DATABASE
);
mongoose.connect(process.env.MONGODB_HOST + process.env.MONGODB_DATABASE, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    // we're connected!
    console.log("connected to db");
});

const getAllUsers = async () => {
    const data = await user.userModel.find();
    console.log(data);
    return data;
};
const addUser = async data => {
    const { userModel } = user;
    const _user = new userModel(data);
    const result = await _user.save();
    console.log("resukt-->", result);
    return result;
};

module.exports = {
    getAllUsers,
    addUser
};
