const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const db = require("../models");

const router = express.Router();
router.get("/", (req, res) => {
  if (!req.user) {
    //DeserializedUser가 만들어 준 객체가 req.user임.
    return res.status(401).send("Login is required.");
  }
  /*
    일반적으로 toJSON()을 붙이지 않아도 되지만,
    DB에서 꺼내온 객체를 가공할 경우에 한하여 toJSON()을 적어야 한다.
  */
  const user = Object.assign({}, req.user.toJSON()); //DB에서 꺼내 온 객체라서 toJSON메서드로 JSON화를 해야 한다.
  delete user.password;
  return res.json(user);
});
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
router.get("/:id", async (req, res, next) => {
  //타인의 정보 가져오기 (req.param.id)
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [
        {
          model: db.Post,
          as: "Posts"
          // attributes: ["id"]
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ["id"]
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ["id"]
        }
      ],
      attributes: ["id", "nickname"]
    });
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
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
    return req.login(user, async loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const fullUser = await db.User.findOne({
        where: { id: user.id },
        include: [
          {
            model: db.Post,
            as: "Posts"
          },
          {
            model: db.User,
            as: "Followings",
            attributes: ["id"]
          },
          {
            model: db.User,
            as: "Followers",
            attributes: ["id"]
          }
        ],
        attributes: ["id", "nickname", "userId"]
      });
      // const filteredUser = Object.assign({}/, user.toJSON());
      // delete filteredUser.password;
      return res.json(fullUser);
    });
  })(req, res, next);
});
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.get("/:id/follower", (req, res) => {});
router.get("/:id/posts", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: {
        UserId: parseInt(req.params.id, 10),
        RetweetId: null
      },
      include: [{ model: db.User, attributes: ["id", "nickname"] }]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
