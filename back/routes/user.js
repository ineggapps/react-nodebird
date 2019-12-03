const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");
const router = express.Router();

router.get("/", (req, res) => {});
router.post("/", async (req, res) => {
  //ghldnjsrkdlq
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (exUser) {
      return res.status(403).send("It is already used.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); //salt는 10~12 사이에서 만듦.
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword
    });
    console.log(newUser);
    return res.json(newUser);
  } catch (e) {
    console.error(e);
    // return res.status(403).send(e);
    return next(e); //프런트에 알아서 오류가 났다고 알려 줌.
  }
});
router.get("/:id", (req, res) => {
  //타인의 정보 가져오기 (req.param.id)
});
router.post("/logout", (req, res) => {});
router.post("/login", (req, res) => {});
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.get("/:id/follower", (req, res) => {});
router.get("/:id/posts", (req, res) => {});

module.exports = router;
