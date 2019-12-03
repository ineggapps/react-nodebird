const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt-nodejs");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userId",
        passwordField: "password"
      },
      async (userId, password, done) => {
        //로그인 전략을 명시
        try {
          const user = await db.User.findOne({ where: { userId } });
          if (!user) {
            //done(오류 관련 정보(e), 성공했을 때, 로직상 오류가 발생한 경우)
            return done(null, false, { reason: "Incorrect username" });
          }
          const result = await bcrypt.compareSync(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "Incorrect password " });
        } catch (e) {
          //서버에서 오류가 난 경우에는 첫 번째 인수에 담아서 전송한다.
          return done(e);
        }
      }
    )
  );
};
