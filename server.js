const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const port = process.env.port || process.env.PORT;

app.use(express.static(path.join(__dirname, "/")));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/src/build/index.html"));
});

try {
    app.listen(port, () => {
        console.log("port", port);
    }).on("error", err => {
        console.log("errrr->", err);
    });
} catch (err) {
    console.log("err");
}
