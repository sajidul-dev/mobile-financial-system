import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method == "POST") {
    const { email, phone, pin } = req.body;
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        const userPassword = await bcrypt.compare(pin, user.pin);
        if (userPassword)
          return res.status(200).send({
            error: false,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              balance: user.balance,
              phone: user.phone,
              role: user.role,
            },
            message: "Log in successfull",
          });
      }
      return res.status(400).send({ error: true, message: "User not found" });
    }
    if (phone) {
      const user = await User.findOne({ phone });
      if (user) {
        const userPassword = await bcrypt.compare(pin, user.pin);
        if (userPassword)
          return res.status(200).send({
            error: false,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              balance: user.balance,
              phone: user.phone,
              role: user.role,
            },
            message: "Log in successfull",
          });
      }
      return res.status(400).send({ error: true, message: "User not found" });
    }
  }
}
