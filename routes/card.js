const { Router } = require("express");
const Card = require("../models/card");
const Device = require("../models/device");
const router = Router();

router.post("/add", async (req, res) => {
  const device = await Device.getById(req.body.id);
  await Card.add(device);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.remove(req.params.id); // получаем *

  res.status(200).json(card);
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("card", {
    title: "Basket",
    isCard: true,
    devices: card.devices,
    price: card.price
  });
});

module.exports = router;
