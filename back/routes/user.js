const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {});
router.post("/", (req, res) => {});
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
