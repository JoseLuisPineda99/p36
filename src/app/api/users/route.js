import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../../lib/mongodb";
import { requireAuth } from "../../../lib/auth";
import { NextResponse } from "next/server";

// GET - Obtener todos los usuarios (solo admins)
export async function GET(request) {
  try {
    const user = await requireAuth(request, "admin");
    
    if (!user) {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    const { db } = await connectToDatabase();
    const users = await db.collection("users")
      .find({}, { projection: { password: 0 } }) // Excluir contraseñas
      .toArray();

    return NextResponse.json({
      message: "Users retrieved successfully",
      users
    });

  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo usuario (solo admins)
export async function POST(request) {
  try {
    const user = await requireAuth(request, "admin");
    
    if (!user) {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    const { email, password, role = "user" } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    
    // Verificar si el usuario ya existe
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      role,
      createdAt: new Date()
    });

    return NextResponse.json({
      message: "User created successfully",
      userId: result.insertedId
    }, { status: 201 });

  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar usuario (solo admins)
export async function DELETE(request) {
  try {
    const user = await requireAuth(request, "admin");
    
    if (!user) {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const { ObjectId } = await import("mongodb");
    
    const result = await db.collection("users").deleteOne({
      _id: new ObjectId(userId)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}