import { dbConnect } from "@/lib/mongoose";
import { Transaction } from "@/models/transaction";
import { User } from "@/models/user";
import { Request, Response } from "express";
import { uuid } from "uuidv4";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method === "POST") {
    const { sender, reciever, amount } = req.body;
    const senderUser = await User.findOne({ phone: sender });
    const recieverUser = await User.findOne({ phone: reciever });
    const admin = await User.findOne({ role: "admin" });
    if (!senderUser) {
      return res.status(400).send({ error: true, message: "User not found" });
    }
    if (amount < 50) {
      return res
        .status(400)
        .send({ error: true, message: "Minimum amount is 50" });
    }
    if (senderUser.balance < amount) {
      return res
        .status(400)
        .send({ error: true, message: "Insufficient balance" });
    }
    senderUser.balance -= amount;
    if (amount > 100) {
      recieverUser.balance += amount - 5;
      admin.balance += amount;
    } else {
      recieverUser.balance += amount;
    }
    await senderUser.save();
    await recieverUser.save();
    await admin.save();
    const transaction_doc = await Transaction.create({
      transaction_id: uuid(),
      transaction_type: "send money",
      sender: sender,
      reciever: reciever,
      admin_profit: {
        sender: sender,
        amount: 5,
      },
      amount: amount,
    });
    return res.status(200).send({
      error: false,
      transaction: {
        transaction_id: transaction_doc.transaction_id,
        amount: amount,
        transaction_type: "send money",
      },
      message: "Send Money Successfull",
    });
  }
}
