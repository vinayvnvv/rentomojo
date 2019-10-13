const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const news = require("./routes/news");
const cors = require("cors");
const comments = require("./routes/comments");
const users = require("./routes/user");
require("dotenv").config();
const port = process.env.port || process.env.BACK_END_PORT;
// middlewares
app.use(cors());
app.use(bodyParser.json());
//routes
app.use("/api/news", news);
app.use("/api/comments", comments);
app.use("/api/users", users);
setTimeout(() => {
    app.listen(port, () => {
        console.log("Back-end started at port -> " + port);
    });
}, 3000);
