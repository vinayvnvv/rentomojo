const express = require("express");
const router = express.Router();
const user = require("./../components/user");
const timeout = 2000;

router.get("/", async (req, res) => {
    const results = await user.getAllUsers();
    res.json(results);
});
router.post("/", async (req, res) => {
    const results = await user.addUser(req.body);
    setTimeout(() => {
        res.json(results);
    }, timeout);
});
module.exports = router;
