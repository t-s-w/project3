import express from "express";
import userDetailsController from "../controllers/userDetails.js";

const router = express.Router();

router.post("/userDetails", userDetailsController.createUserDetails);

export default router;
