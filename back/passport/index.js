const passport = require("passport");
const db = require("../model");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 서버 사이드에 [{id:3, cookie: "asfdgh"}] 따위로 저장
    /* (가벼운 객체로 저장하여 서버의 부하를 최소화하기 위한 목적으로 만들어진 개념)
    사용자가 로그인한 정보를 세션에 저장하는데, 
    실제로 이러한 사용자들의 정보를 서버 메모리쪽에 저장해 두면 과부하가 걸리기 때문에
    데이터베이스 테이블의 일련번호(id값)를 이용하여 서버 쪽에서 cookie와 매핑한 배열 따위와 같이 서버에 저장해 두고
    쿠키는 클라이언트 측에 보내준다.
    그러면 클라이언트에서는 쿠키를 보내 오면 서버에서는 쿠키 과 매핑된 id값을 이용하여 테이블에서 값을 찾아서 사용자를 식별한다.
  */
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    /*
     1. 클라이언트에서 쿠키 값을 보내오면 서버에 저장된 id값을 찾는다   
     2. serializeUser에서 저장되었던 id값을 이용하여 db에서 불러와서
     3. 데이터베이스에서 해당 정보를 추출 
    */
    try {
      const user = await db.User.findOne({
        where: { id }
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
};
