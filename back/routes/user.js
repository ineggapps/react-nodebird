const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {});
router.post("/", async (req, res, next) => {
  //회원가입
  try {
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (exUser) {
      return res.status(403).send("It is already used.");
    }
    const hashedPassword = await bcrypt.hashSync(req.body.password); //salt는 10~12 사이에서 만듦.
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
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("goodbye");
});
router.post("/login", (req, res, next) => {
  // /api/user/login
  passport.authenticate("local", (err, user, info) => {
    //(err,user,info) <= done의 인자 순서와 일치함.
    if (err) {
      console.error(err);
      // return next(err);
      return;
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    //req.login 후에 serializeUser가 실행된다.
    return req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const filteredUser = Object.assign({}, user.toJSON());
      delete filteredUser.password;
      return res.json(filteredUser);
    });
  })(req, res, next);
});
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.get("/:id/follower", (req, res) => {});
router.get("/:id/posts", (req, res) => {});

module.exports = router;
