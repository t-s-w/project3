import Receipt from "../models/Receipt.js";

async function create(req, res) {
  try {
    const newReceipt = new Receipt.create(req.body);
    await newReceipt.save();
    res.json(newReceipt);
  } catch (err) {
    res.status(400).json(err);
  }
}

export { create };
