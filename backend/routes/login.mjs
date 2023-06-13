import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.mjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  userModel
    .findOne({ username: username })
    .then((user) => {
      console.log(user);
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                username: user.username,
              },
              "secret123"
            );
            res.json({ message: "Login Successfull", user: token });
          } else {
            res.json({ message: "Password didn't match", user: false });
          }
        });
      } else {
        res.json({ message: "User not registered" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Something went wrong" });
    });
});

export default router;
