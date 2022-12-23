const express = require("express");
const router = express.Router({ mergeParams: true });
const Announcement = require("../models/Announcement");
const Reply = require("../models/Reply");
const auth = require("../middleware/auth.middleware");

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
    const replies = await Reply.find({ announce: announce._id });
    const rateList = replies.map((i) => i.rate);
    const sumRates = rateList.reduce((acc, i) => {
      return (acc += i);
    }, 0);
    announce.rate = Math.floor(sumRates / rateList.length);
    announce.save();
    res.send(newComment);
  } catch (e) {
    res.status(501).json({
      message: "Произошла ошибка на сервере",
    });
  }
});

router.post("/removeAnnouncement", auth, async (req, res) => {
  try {
    const { announceId } = req.body;
    const announce = await Announcement.findById(announceId);
    await announce.remove();
    res.send(announce);
  } catch (e) {
    res.status(501).json({
      message: "Произошла ошибка на сервере",
    });
  }
});

router.post("/removeReply", auth, async (req, res) => {
  try {
    const { replyId } = req.body;
    const reply = await Reply.findById(replyId);
    await reply.remove();
    res.send(reply);
  } catch (e) {
    res.status(501).json({
      message: "Произошла ошибка на сервере",
    });
  }
});

module.exports = router;
