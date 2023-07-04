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
  if (!userId) {
    res.status(401).json({ message: "Not logged in" });
  }
  try {
    const userDetail = await UserDetail.find({ customerId: userId });
    if (userDetail.length < 1) {
      console.log('routed')
      const newProfile = await UserDetail.create({customerId: userId})
      res.json(newProfile);
      return
    }
    res.json(userDetail[0]);
  } catch {
    res.status(404).json({ msg: "Id not found!" });
  }
}

export { createUserDetails, findUserById };
