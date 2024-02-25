import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  nid: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    require: true,
  },
  //   transaction: [
  //     {
  //       transactionType: String,
  //       amount: Number,
  //     },
  //   ],
  //   comments: [
  //     {
  //       userId: { type: mongoose.Schema.Types.ObjectId },
  //       comment: String,
  //     },
  //   ],
});

export const User = models?.User || mongoose.model("User", userSchema);
