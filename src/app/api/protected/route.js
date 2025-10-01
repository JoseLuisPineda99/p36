import { verifyToken } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/mongoose";

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
    if (!user) {
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401,
      });
    }

    return new Response(
      JSON.stringify({
        message: `Hola ${user.id}, tu rol es ${user.role}`,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
    });
  }
}
