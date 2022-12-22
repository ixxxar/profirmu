const express = require("express");
const router = express.Router({ mergeParams: true });
const Announcement = require("../models/Announcement");
const Reply = require("../models/Reply");

router.get("/getAnnouncements", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    const replies = await Reply.find();
    res.send({ announcements, replies });
  } catch (e) {
    res.status(501).json({
      message: "Произошла ошибка на сервере",
    });
  }
});

router.post("/createNew", async (req, res) => {
  try {
    const { name, inn, adres, phone, userName, email, rate, comment } =
      req.body;
    const newAnnounce = await Announcement.create({
      name,
      inn,
      adres,
      phone,
    });
    const newReply = await Reply.create({
      userName,
      email,
      rate,
      comment,
      announce: newAnnounce._id,
    });
    newAnnounce.items.push(newReply);
    newAnnounce.save();
    console.log(newAnnounce);
    res.send(newAnnounce);
  } catch (e) {
    res.status(501).json({
      message: "Произошла ошибка на сервере",
    });
  }
});

router.post("/createComment", async (req, res) => {
  try {
    const { announce: reqAnnounce } = req.body;
    const announce = await Announcement.findById(reqAnnounce);
    const newComment = await Reply.create({
      ...req.body,
      announce,
    });
    announce.items.push(newComment._id);
    announce.save();
    res.send(newComment);
  } catch (e) {
    res.status(501).json({
      message: "Произошла ошибка на сервере",
    });
  }
});

module.exports = router;
