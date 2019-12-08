const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    const posts = await db.Posts.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.name) } //hashtag에 관련된 where문은 이곳에 적는다
        },
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
