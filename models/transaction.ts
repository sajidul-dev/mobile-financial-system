import mongoose, { Schema, models } from "mongoose";

const transactionSchema = new Schema({
  transaction_id: { type: String, required: true },
  transaction_type: { type: String, required: true },
  user_id: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Transaction =
  models?.Transaction || mongoose.model("Transaction", transactionSchema);
