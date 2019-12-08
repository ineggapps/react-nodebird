const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const db = require("./models");
const dotenv = require("dotenv");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const hashtagAPIRouter = require("./routes/hashtag");
dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();
const port = 3065;
//DB 구성하기

//JSON 형식의 본문을 처리하기 위해서 필요한 구문들
//모든 경로에 적용할 때는 "/"를 생략해도 된다.
//body-parser는 필요없고 express에서 자체적으로 지원해주게 되었음.
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true
    /*
    클라이언트와 쿠키로 통신할 수 있도록 옵션 2가지 설정(origin, credentials)
    프런트엔드 단과 백엔드 단의 서버 주소가 다르기 때문에 쿠키가 생성되지 않으므로 별도의 옵션이 필요하다.
    1. login 요청의 Header 정보에서 Access-Control-Allow-Credentials가 true여야 하고
    2. Access-Control-Allow-Origin: 프런트엔드 단의 주소 (http://localhost:3000)로 떠야 한다.
    */
  })
);
console.log(process.env.COOKIE_SECRET);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false, //매번 세션 강제 저장
    saveUninitialized: false, //빈 값도 저장하기
    secret: process.env.COOKIE_SECRET, //암호화 키값
    cookie: {
      httpOnly: true,
      secure: false //https를 쓸 때 true
    },
    name: "rnbck" //로그인 세션 쿠키 이름 (보안상)
  })
);
app.use(passport.initialize());
//express session을 선 정의한 후에 passport 세션을 정의해야 함
app.use(passport.session());
//API: 다른 서비스가 나의 서비스의 기느응ㄹ 실행할 수 있도록 열여 둔 창구
app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
