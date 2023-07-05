import User from "../models/User.js";
import UserDetail from "../models/UserDetail.js";

async function updateUserDetails(req, res) {
  try {
    const userId = req.user._id;
    const existingUser = await UserDetail.findOne({ customerId: userId });
    console.log(userId);
    console.log(req.body);
    if (existingUser) {
      const { name, contactNo, address, preferences, favourites } = req.body;
      await UserDetail.findOneAndUpdate(
        { customerId: userId },
        {
          name: name,
          contactNo: contactNo,
          address: address,
          preferences: preferences,
          $push: { favourites: favourites },
        },
        { new: true } // Include the options object here
      );
      res.status(201).json("success");
    }
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
      console.log("routed");
      const newProfile = await UserDetail.create({ customerId: userId });
      res.json(newProfile);
      return;
    }
    res.json(userDetail[0]);
  } catch {
    res.status(404).json({ msg: "Id not found!" });
  }
}

export { updateUserDetails as updateUserDetails, findUserById };
