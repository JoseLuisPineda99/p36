import connectToDatabase from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await connectToDatabase();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new User({ username: "admin", password: hashedPassword, role: "admin" });
  await admin.save();

  res.status(200).json({ message: "Admin creado" });
}
