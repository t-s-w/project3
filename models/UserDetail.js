import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userDetailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserDetail", userDetailSchema);
