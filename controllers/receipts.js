import Receipt from "../models/Receipt.js";
import Event from "../models/Event.js"
import jwt from 'jsonwebtoken';

export async function purchase(req, res) {
  try {
    if (!req.user) { res.status(401).json({ message: 'Not logged in' }); return }
    const receipt = {
      deliveryName: req.body.deliveryName,
      deliveryAddress: req.body.deliveryAddress,
      deliveryContactNo: req.body.deliveryContactNo
    }
    jwt.verify(req.body.purchaseInfo, process.env.SECRET, function (err, decoded) {
      if (!err) {
        const verified = decoded.verifiedReceipt
        receipt.row = verified.row
        receipt.startSeat = verified.startSeat
        receipt.endSeat = verified.endSeat
        receipt.amountPaid = verified.amountPaid
        receipt.eventId = verified.eventId
        receipt.amountPaid = verified.amountPaid
        receipt.customerId = req.user._id
      }
    })
    const pastReceipts = await Receipt.find({ eventId: receipt.eventId, row: receipt.row })
    for (let rcpt of pastReceipts) {
      if (receipt.startSeat <= rcpt.endSeat && (receipt.endSeat >= rcpt.startSeat)) {
        throw new Error('Some of the selected seats are unavailable')
      }
    }
    const acceptedReceipt = await Receipt.create(receipt);
    const populatedReceipt = await Receipt.findById(acceptedReceipt._id).populate('eventId');
    res.json(populatedReceipt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function verifyPurchase(req, res) {
  try {
    if (!req.user) { res.status(401).json({ message: 'Not logged in' }); return }

    if (!req.body.row || !req.body.startSeat || !req.body.endSeat || !req.body.eventId || (req.body.startSeat > req.body.endSeat)) { res.status(400).json({ message: "Invalid request" }); return }

    const checkEvent = await Event.findById(req.body.eventId)
    if (!checkEvent) { res.status(400).json({ message: "Event id not found" }); return }

    const seatConfig = checkEvent.seatConfig.seats.find(x => x.row = req.body.row)
    if (!seatConfig) { res.status(400).json({ message: "Invalid request" }) }
    if (req.body.startSeat < 1 || (req.body.endSeat > seatConfig.count)) { res.status(400).json({ message: "Invalid request" }) }

    const pastReceipts = await Receipt.find({ eventId: req.body.eventId, row: req.body.row })
    for (let receipt of pastReceipts) {
      if (req.body.startSeat <= receipt.endSeat && (req.body.endSeat >= receipt.startSeat)) {
        res.status(400).json({ message: "Some of the selected seats are unavailable" })
        return
      }
    }

    const verifiedReceipt = {
      eventId: req.body.eventId,
      startSeat: req.body.startSeat,
      endSeat: req.body.endSeat,
      customerId: req.user._id,
      physical: true,
      row: req.body.row,
      amountPaid: req.body.amountPaid
    }

    const purchaseToken = jwt.sign({ verifiedReceipt }, process.env.SECRET
    )

    res.json(purchaseToken)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function cancel(req, res) {
  const id = req.params.id
  const userId = req.user?._id
  console.log('cancel attempt')
  try {
    const receipt = await Receipt.findById(id);
    if (!receipt) {
      res.status(404).json({ message: "Requested receipt id not found" })
      return
    }
    if (!receipt.customerId.equals(userId)) {
      res.status(403).json({ message: "You are not authorised to make this request" })
      return
    }
    const response = await Receipt.deleteOne({ _id: id })
    res.json(response);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function getReceiptWithEvent(req, res) {
  const id = req.params.id
  try {
    const receipt = await Receipt.findById(id).populate('eventId')
    if (!receipt) {
      res.status(404).json({ message: "Requested receipt id not found" })
      return
    }
    res.json(receipt)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

export async function getReceiptsByUser(req, res) {
  const userId = req.user._id
  if (!userId) {
    res.status(401).json({ message: "Not logged in" })
  }
  try {
    const receipts = await Receipt.find({ customerId: userId }).populate('eventId');
    receipts.sort((x, y) => y.createdAt > x.createdAt ? 1 : -1)
    res.json(receipts)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}