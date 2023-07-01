import Receipt from "../models/Receipt.js";

async function purchase(req, res) {
  try {
    const pastReceipts = await Receipt.find({ eventId: req.body.eventId, row: req.body.row })
    for (let receipt of pastReceipts) {
      if (req.body.startSeat <= receipt.endSeat && (req.body.endSeat >= receipt.startSeat)) {
        res.status(400).json({ message: "Some of the selected seats are unavailable" })
        return
      }
    }
    const acceptedReceipt = await Receipt.create(req.body);
    res.json(acceptedReceipt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function cancel(req, res) {
  const id = req.params.id
  try {
    const response = await Receipt.deleteOne({ _id: id });
    res.json(response);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export { purchase, cancel };
