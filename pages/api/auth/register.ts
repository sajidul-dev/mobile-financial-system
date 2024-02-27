import { dbConnect } from "@/lib/mongoose";
import { Request, Response } from "express";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method == "POST") {
    const { name, email, phone, pin, nid, role } = req.body;
    let balance;
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ error: "User already exists" });
      }
    }
    if (role == "user") {
      balance = 40;
    } else {
      balance = 100000;
    }
    const hashedPin = await bcrypt.hash(pin, 10);
    const userDoc = await User.create({
      name,
      email,
      phone,
      nid,
      role,
      balance,
      pin: hashedPin,
    });
    res.status(200).send({
      error: false,
      user: { _id: userDoc._id, name: userDoc.name, email: userDoc.email },
      message: "User created successfully",
    });
  }
}
