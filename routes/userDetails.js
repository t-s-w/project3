import express from "express";
import * as userDetailsController from "../controllers/userDetails.js";

const router = express.Router();

router.patch("/", userDetailsController.updateUserDetails);
router.get("/getOneUser", userDetailsController.findUserById);
router.get("/favourites", userDetailsController.getFavouritesById);

export default router;
