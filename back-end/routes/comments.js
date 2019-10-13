const express = require("express");
const router = express.Router();
const comments = require("./../components/comments");
const timeout = 1200; //added delay for handling loaders in front-end
router.get("/:id", async (req, res) => {
    const results = await comments.getAllComments(req.params.id);
    setTimeout(() => {
        res.json(results);
    }, timeout);
});
router.post("/:id", async (req, res) => {
    const results = await comments.addComment(req.body, req.params.id);
    setTimeout(() => {
        res.json(results);
    }, timeout);
});
router.put("/:id/:commentId", async (req, res) => {
    const results = await comments.editComment(
        req.body,
        req.params.id,
        req.params.commentId
    );
    res.json(results);
});
router.delete("/:id", async (req, res) => {
    const results = await comments.deleteComments(req.params.id);
    res.json(results);
});
module.exports = router;
