const bcrypt = require("bcrypt");

const userData = [
  {
    name: "Gaurav",
    email: "gtripathi204@gmail.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "user",
    email: "user204@gmail.com",
    password: bcrypt.hashSync("11111", 10),
    isAdmin: false,
  },
];

module.exports = userData;