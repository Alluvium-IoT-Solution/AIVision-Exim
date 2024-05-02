import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user: [
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  ],
  importerURL: {
    type: String,
    required: true,
  },
});

const Customer = new mongoose.model("Customer", customerSchema);
export default Customer;
