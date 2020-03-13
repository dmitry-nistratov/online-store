const { Router } = require("express");
const router = Router();

const sale = require("../models/sale");

router.get("/", async (req, res) => {
  const sales = await sale.getAll();

  res.render("index", {
    title: "Main page",
    sales,
    isHome: true
  });
});

module.exports = router;
