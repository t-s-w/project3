import User from "../models/User.js";
import UserDetail from "../models/UserDetail.js";

async function createUserDetails(req, res) {
  try {
    const { name, contactNo, address } = req.body;

    const userDetail = new UserDetail({
      name,
      contactNo,
      address,
      customerId: req.user._id,
    });

    const savedUserDetail = await userDetail.save();

    res.status(201).json(savedUserDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function findUserById(req, res) {
  const userId = req.user._id;
  try {
    const userDetail = await UserDetail.find({ customerId: userId });
    if (userDetail.length < 1) {
      res.status(404).json({ msg: "Requested customerId not found" });
    }
    res.json(userDetail[0]);
  } catch {
    res.status(404).json({ msg: "Id not found!" });
  }
}

export { createUserDetails, findUserById };
