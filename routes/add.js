const { Router } = require("express");
const Device = require("../models/device");

const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add device",
    isAdd: true
  });
});

router.post("/", async (req, res) => {
  const { title, price, image } = req.body;
  const device = new Device(title, price, image);

  await device.save(); // т. к. возвращает промис
  res.redirect("/devices");
});

module.exports = router;
