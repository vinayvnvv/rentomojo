const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: String,
    author: String,
    authorId: String,
    banner: String,
    body: String,
    date: { type: Date, default: Date.now }
});

module.exports = {
    newsModel: mongoose.model("news", newsSchema),
    newsSchema
};
