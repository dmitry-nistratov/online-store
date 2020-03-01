const { Router } = require("express");
const Device = require("../models/device");
const router = Router();

router.get("/", async (req, res) => {
  const devices = await Device.getAll();

  res.render("devices", {
    title: "Devices",
    isDevices: true,
    devices
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    // query parameter
    return res.redirect("/");
  }

  const device = await Device.getById(req.params.id);

  res.render("device-edit", {
    title: `Edit ${device.title}`,
    device
  });
});

router.post("/edit", async (req, res) => {
  await Device.update(req.body);
  res.redirect("/devices");
});

router.get("/:id", async (req, res) => {
  const device = await Device.getById(req.params.id);
  // обрабатываемый новый get запрос с префиксом devices
  res.render("device", {
    layout: "empty",
    title: `Device ${device.title}`,
    device
  }); // страницы будет называться device
});

module.exports = router;
