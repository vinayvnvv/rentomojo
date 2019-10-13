const mongoose = require("mongoose");
require("dotenv").config();
const comments = require("./../schemas/comments");
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

const getAllComments = async newsId => {
    const data = await comments.commentsModel.find({
        newsId
    });
    console.log(data);
    return data;
};
const addComment = async (data, newsId) => {
    const { commentsModel } = comments;
    data["newsId"] = newsId;
    const _commets = new commentsModel(data);
    const result = await _commets.save();
    console.log("resukt-->", result);
    return result;
};
const editComment = async (data, newsId, commentId) => {
    const { commentsModel } = comments;
    // const _commets = new commentsModel(data);
    const result = await commentsModel.update({ _id: commentId, newsId }, data);
    console.log("resukt-->", result);
    return result;
};
const deleteComments = async newsId => {
    const { commentsModel } = comments;
    const result = await commentsModel.remove({ newsId });
    console.log("resukt-->", result);
    return result;
};

module.exports = {
    getAllComments,
    addComment,
    editComment,
    deleteComments
};
