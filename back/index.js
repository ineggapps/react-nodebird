const express = require("express");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");
const app = express();
const port = 3065;

// db.sequelize.sync();

//API: 다른 서비스가 나의 서비스의 기느응ㄹ 실행할 수 있도록 열여 둔 창구
app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
