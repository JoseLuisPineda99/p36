import connectToDatabase from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  await connectToDatabase();

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ token });
}
