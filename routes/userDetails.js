import express from "express";
import * as userDetailsController from "../controllers/userDetails.js";

const router = express.Router();

router.post("/", userDetailsController.createUserDetails);
router.get("/:id", userDetailsController.findUserById);

export default router;
