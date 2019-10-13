require("dotenv").config();
const opn = require("opn");
console.log("opening browser....");
setTimeout(() => {
    opn("http://localhost:" + process.env.PORT);
    console.log("\n\n");
    console.log(
        "\x1b[36m%s\x1b[0m",
        "Live Server started on http://localhost:" + process.env.PORT + "/"
    );
}, 2800);
