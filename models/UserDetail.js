import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userDetailSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    contactNo: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    preferences: { type: String, default: "" },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        unique: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserDetail", userDetailSchema);
