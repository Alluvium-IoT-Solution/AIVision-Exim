import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";

const router = express.Router();

router.post("/api/addOperationsTeamUser", async (req, res) => {
  const { email, password, port } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            res.send(err);
          } else {
            const user = new User({
              email,
              password: hashedPassword,
              port,
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

export default router;
