const express = require("express");
const next = require("next");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

//next에 필요한 부분
app.prepare().then(() => {
  const server = express();
  server.use(morgan("dev"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: "",
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );
  server.get("*", (req, res) => {
    return handle(req, res); //next에서 뽑아온 handle(get요청처리기)
  });
  server.listen(3060, () => {
    console.log("next+express running on port 3060");
  });
});
