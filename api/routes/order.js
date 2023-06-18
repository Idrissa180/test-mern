const Order = require("../models/Order");
const Product = require("../models/Product");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  let check = Product.findById(req.body.userId);

  if (!check) return res.status(501).json("This product doesn't exist");

  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order item has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ITEM

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL  ITEMS

router.get("/", async (req, res) => {
  try {
    let orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
