import { verifyToken } from "../../lib/auth";

export default function handler(req, res) {
  const user = verifyToken(req, res);
  if (!user) return res.status(401).json({ message: "No autorizado" });

  res.status(200).json({ message: `Hola ${user.id}, tu rol es ${user.role}` });
}
