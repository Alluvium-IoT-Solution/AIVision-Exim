import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/register", (req, res) => {
  const { username, password, role } = req.body;
  console.log(username, password, role);
  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            res.send(err);
          } else {
            const user = new User({
              username,
              password: hashedPassword,
              role,
            });
            user
              .save()
              .then(() => {
                res.send({
                  message: "Successfully registered, login now.",
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

export default router;
