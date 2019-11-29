const express = require("express");
const app = express();
const port = 3065;

app.get("/", (req, res) => {
  res.send("Hello page");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
