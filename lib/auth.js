import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export function getTokenFromHeaders(headers) {
  const authHeader = headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");               
  }
  return authHeader.substring(7);
}

export async function requireAuth(request, requiredRole = null) {
  try {
    const token = getTokenFromHeaders(request.headers);
    const decoded = verifyToken(token);
    
    if (requiredRole && decoded.role !== requiredRole) {
      throw new Error("Insufficient permissions");
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}
