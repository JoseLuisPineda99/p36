import { verifyToken } from "../../lib/auth";

export default async function handler(req, res) {
  const decoded = verifyToken(req, res);
  if (!decoded.userId) return;

  res.json({ message: "Acceso permitido", user: decoded });
}
