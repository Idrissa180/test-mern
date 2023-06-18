const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    adress: { type: String, required: true },
    status: { type: String, default: "Pending"},
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
