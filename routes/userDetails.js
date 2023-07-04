import express from "express";
import * as userDetailsController from "../controllers/userDetails.js";

const router = express.Router();

router.post("/", userDetailsController.createUserDetails);
router.get("/getOneUser", userDetailsController.findUserById);

export default router;
