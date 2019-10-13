const mongoose = require("mongoose");
require("dotenv").config();
const news = require("./../schemas/news");
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

const getAllNews = async () => {
    const data = await news.newsModel.find();
    console.log(data);
    return data;
};
const addNews = async data => {
    const { newsModel } = news;
    const _news = new newsModel(data);
    const result = await _news.save();
    console.log("resukt-->", result);
    return result;
};
const deleteNews = async id => {
    const { newsModel } = news;
    const result = await newsModel.remove({ _id: id });
    return result;
};

module.exports = {
    getAllNews,
    addNews,
    deleteNews
};
