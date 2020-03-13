const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const homeRoutes = require("./routes/home");
const cardRoutes = require("./routes/card");
const devicesRoutes = require("./routes/devices");
const contactsRoutes = require("./routes/contacts");
const addRoutes = require("./routes/add");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
});

app.engine("hbs", hbs.engine); // регистрируем в экспрессе движок hbs
app.set("view engine", "hbs"); // начинаем использовать
app.set("views", "views"); // параметр views, каталог, в котором находятся файлы шаблонов

app.use(express.static(path.join(__dirname, "public"))); // регистрируем (через use добавляем новый функционал)
// express.static используется для предоставления статических файлов (предоставление изображений, файлов CSS и JavaScript, расположенных в каталоге public)
app.use(express.urlencoded({ extended: true })); //

app.use("/", homeRoutes);
app.use("/devices", devicesRoutes);
app.use("/add", addRoutes);
app.use("/contacts", contactsRoutes);
app.use("/card", cardRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
