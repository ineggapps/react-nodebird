const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  //GET api/posts
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"] //비밀번호와 같은 보안 항목은 가져오지 않기
        }
      ],
      order: [
        ["createdAt", "DESC"],
        ["updatedAt", "ASC"]
      ] //정렬
    });
    console.log(posts, "포스트 조회");
    return res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
