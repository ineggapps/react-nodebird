const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    console.log("해시태그 입력됨", req.params);
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          where: { name: decodeURIComponent(req.params.tag) } //hashtag에 관련된 where문은 이곳에 적는다
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
