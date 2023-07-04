import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userDetailSchema = new Schema(
  {
    name: {
      type: String,

    },
    contactNo: {
      type: Number,

    },
    address: {
      type: String,

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
