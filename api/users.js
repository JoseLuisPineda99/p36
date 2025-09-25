import { verifyToken } from "../../lib/auth";
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const decoded = verifyToken(req, res);
  if (!decoded.userId) return;
  if (decoded.role !== "admin") {
    return res.status(403).json({ error: "Solo administradores" });
  }

  const { db } = await connectToDatabase();
  const users = await db.collection("users").find().toArray();

  res.json(users);
}
