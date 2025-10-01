import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ error: "Email y contraseña son requeridos" }),
      {
        status: 400,
      }
    );
  }

  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ error: "Usuario no encontrado" }),
      {
        status: 401,
      }
    );
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return new Response(
      JSON.stringify({ error: "Contraseña incorrecta" }),
      {
        status: 401,
      }
    );
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return new Response(JSON.stringify({ token }), {
    status: 200,
  });
}
