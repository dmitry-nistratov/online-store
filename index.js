const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const devicesRoutes = require("./routes/devices");
const addRoutes = require("./routes/add");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine); // регистрируем в экспрессе движок hbs
app.set("view engine", "hbs"); // начинаем использовать
app.set("views", "views");

app.use(express.static("public")); // регистрируем (через use добавляем новый функционал)
app.use(express.urlencoded({ extended: true })); //

app.use("/", homeRoutes);
app.use("/devices", devicesRoutes);
app.use("/add", addRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
