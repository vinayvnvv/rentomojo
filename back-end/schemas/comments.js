const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    name: String,
    text: String,
    level: [Number],
    newsId: String,
    date: { type: Date, default: Date.now }
});

module.exports = {
    commentsSchema,
    commentsModel: mongoose.model("comments", commentsSchema)
};
