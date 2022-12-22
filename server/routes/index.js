const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/announcement", require("./announcement.routes"));

module.exports = router;
