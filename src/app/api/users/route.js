import { connectToDatabase } from "../../../../lib/mongoose";
import User from "../../../../models/User";
import { verifyToken } from "../../../../lib/auth";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    await connectToDatabase();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ error: "Token no proporcionado" }), {
        status: 401,
      });
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Acceso denegado" }), {
        status: 403,
      });
    }

    const users = await User.find({}, { password: 0 });
    return new Response(JSON.stringify(users), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return new Response(JSON.stringify({ error: "Token no proporcionado" }), {
        status: 401,
      });
    }

    const user = verifyToken(token);
    if (!user || user.role !== "admin") {
      return new Response(JSON.stringify({ error: "Acceso denegado" }), {
        status: 403,
      });
    }

    const { email, password, role } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email y contraseña son requeridos" }), {
        status: 400,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "El usuario ya existe" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hashedPassword, role });

    return new Response(JSON.stringify({ message: "Usuario creado", user: newUser }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
    });
  }
}
