const libs = [
    "./node_modules/vue/dist/vue.min.js",
    "./node_modules/moment/min/moment.min.js"
];
const copy = require("cp-file");
async function start() {
    for (let i = 0; i < libs.length; i++) {
        let file = libs[i];
        let split = file.split("/");
        let name = "a-lib-" + split[split.length - 1];
        let dest = "./src/build/libs/" + name;
        console.log(dest);
        await copy(file, dest);
    }
}
start();
