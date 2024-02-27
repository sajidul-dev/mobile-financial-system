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
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  nid: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    require: true,
  },
});

export const User = models?.User || mongoose.model("User", userSchema);
