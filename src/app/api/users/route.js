import connectToDatabase from "../../lib/mongodb";
import User from "../../models/User";
import { verifyToken } from "../../lib/auth";

export default async function handler(req, res) {
  const user = verifyToken(req, res);
  if (!user || user.role !== "admin") return res.status(403).json({ message: "Acceso denegado" });

  await connectToDatabase();

  const users = await User.find({}, { password: 0 });
  res.status(200).json(users);
}
