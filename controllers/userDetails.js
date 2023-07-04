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
  const { id } = req.params;
  try {
    const userDetail = await UserDetail.findUserById(id);
    if (!userDetail) {
      res.status(404).json({ msg: "Requested event id not found" });
    }
    res.json(userDetail);
  } catch {
    res.status(404).json({ msg: "Id not found!" });
  }
}

export { createUserDetails, findUserById };
