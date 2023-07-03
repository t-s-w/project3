import UserDetail from "../models/UserDetail.js";

export async function createUserDetails(req, res) {
  try {
    const { name, contactNo, address } = req.body;

    const userDetail = new UserDetail({
      name,
      contactNo,
      address,
    });

    const savedUserDetail = await userDetail.save();

    res.status(201).json(savedUserDetail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}