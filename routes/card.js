const { Router } = require("express");
const Card = require("../models/card");
const Device = require("../models/device");
const router = Router();

router.post("/add", async (req, res) => {
  const device = await Device.getById(req.body.id);
  await Card.add(device);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const card = await card.fetch();
  res.render("card", {
    title: "Basket",
    card
  });
});

module.exports = router;
