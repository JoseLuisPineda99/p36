import { requireAuth } from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await requireAuth(request);
    
    if (!user) {
      return NextResponse.json(
        { error: "Access denied. Valid token required." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Acceso permitido",
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Protected route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  return GET(request); // Usar la misma lógica para POST
}
