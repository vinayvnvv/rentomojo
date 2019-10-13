const express = require("express");
const router = express.Router();
const news = require("./../components/news");
const timeout = 1000; //added delay for handling loaders in front-end

router.get("/", async (req, res) => {
    const results = await news.getAllNews();
    setTimeout(() => {
        res.json(results);
    }, timeout);
});
router.post("/", async (req, res) => {
    const results = await news.addNews(req.body);
    setTimeout(() => {
        res.json(results);
    }, timeout);
});
router.delete("/:id", async (req, res) => {
    const results = await news.deleteNews(req.params.id);
    setTimeout(() => {
        res.json(results);
    }, timeout);
});
module.exports = router;
