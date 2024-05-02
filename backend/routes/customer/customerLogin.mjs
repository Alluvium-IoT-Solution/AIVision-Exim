import express from "express";
import Customer from "../../models/customer/customerModel.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/api/customerLogin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const customer = await Customer.findOne({ username: username }); // Adjusted query to search by username

    if (!customer) {
      return res.json({ message: "User not registered" });
    } else {
      // Compare passwords
      bcrypt.compare(
        password,
        customer.password,
        (passwordErr, passwordResult) => {
          if (passwordErr) {
            console.error(passwordErr);
            return res.json({ message: "Something went wrong" });
          }
          if (passwordResult) {
            return res.json({
              message: "Login Successful",
              username: customer.username,
              email: customer.email,
              importerURL: customer.importerURL,
            });
          } else {
            return res.json({ message: "Password didn't match" });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error" });
  }
});

export default router;
