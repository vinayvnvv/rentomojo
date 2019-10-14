const del = require("del");
const makeDir = require("make-dir");
async function start() {
    new Promise(async (res, rej) => {
        await del(["src/build"]); //delete build
        await makeDir("src/build"); //make a new build
        await makeDir("src/build/js");
        await makeDir("src/build/styles");
        await makeDir("src/build/libs");
        console.log("completd");
        res(true);
    });
}
start();
