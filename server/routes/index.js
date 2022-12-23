const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/announcement", require("./announcement.routes"));
router.use("/auth", require("./auth.routes"));

module.exports = router;
