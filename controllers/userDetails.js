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
          $addToSet: { favourites: favourites },
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
    const userDetail = await UserDetail.findOne({ customerId: userId });
    if (userDetail.length > 0) {
      console.log("routed");
      console.log(userId);
      const newProfile = await UserDetail.create({ customerId: userId });
      res.json(newProfile);
      return;
    }
    res.json(userDetail);
  } catch {
    res.status(404).json({ msg: "Id not found!" });
  }
}

async function getFavouritesById(req, res) {
  const userId = req.user._id;
  if (!userId) {
    res.status(401).json({ message: "Not logged in" });
  }
  try {
    const userDetail = await UserDetail.find({ customerId: userId });
    if (userDetail) {
      console.log("get favourites");
      const userFavourites = await UserDetail.find(
        { customerId: userId }
      ).populate('favourites');
      res.json(userFavourites[0].favourites);
      return;
    }
    res.json(userDetail);
  } catch {
    res.status(404).json({ msg: "Id not found!" });
  }
}

export {
  updateUserDetails as updateUserDetails,
  findUserById,
  getFavouritesById,
};
