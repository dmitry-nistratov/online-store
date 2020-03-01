const fs = require("fs");
const path = require("path");
const uuid = require("uuid/v4");

class Device {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.id = uuid();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id
    };
  }

  async save() {
    const devices = await Device.getAll();

    devices.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "devices.json"),
        JSON.stringify(devices), // дату, которую мы хотим записать
        err => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static async update(device) {
    const devices = await Device.getAll();

    const idx = devices.findIndex(item => item.id === device.id);
    devices[idx] = device;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "devices.json"),
        JSON.stringify(devices), // дату, которую мы хотим записать
        err => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "devices.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const devices = await this.getAll();

    return devices.find(item => item.id === id);
  }
}

module.exports = Device;
