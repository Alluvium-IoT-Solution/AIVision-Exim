const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

const router = express.Router();

router.post("/api/register", (req, res) => {
  const { username, email, password, role } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            res.send(err);
          } else {
            const user = new User({
              username,
              email,
              password: hashedPassword,
              role,
            });
            user
              .save()
              .then(() => {
                res.send({
                  message: "Successfully registered",
                });
              })
              .catch((err) => {
                res.send(err);
              });
          }
        });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
