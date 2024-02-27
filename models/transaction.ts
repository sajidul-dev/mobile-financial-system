import mongoose, { Schema, models } from "mongoose";

const transactionSchema = new Schema(
  {
    transaction_id: { type: String, required: true },
    transaction_type: { type: String, required: true },
    sender: { type: Number, required: true },
    reciever: { type: Number, required: true },
    admin_profit: {
      sender: { type: Number },
      amount: { type: Number },
    },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Transaction =
  models?.Transaction || mongoose.model("Transaction", transactionSchema);
