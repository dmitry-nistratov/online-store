const fs = require("fs");
const path = require("path");

class Sale {
  constructor(id, poster) {
    this.id = id;
    this.poster = poster;
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "sales.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          else resolve(JSON.parse(content));
        }
      );
    });
  }
}

module.exports = Sale;
