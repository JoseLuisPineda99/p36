// Script para crear un usuario admin de prueba
// Ejecutar con: node scripts/create-admin.js

import bcrypt from "bcryptjs";
import { connectToDatabase } from "../lib/mongodb.js";

async function createAdminUser() {
  try {
    console.log("🔗 Conectando a MongoDB...");
    const { db } = await connectToDatabase();
    
    // Datos del usuario admin
    const adminData = {
      email: "admin@p36.com",
      password: "admin123",
      role: "admin"
    };
    
    // Verificar si ya existe
    const existingAdmin = await db.collection("users").findOne({ 
      email: adminData.email 
    });
    
    if (existingAdmin) {
      console.log("❌ El usuario admin ya existe");
      process.exit(0);
    }
    
    // Hashear contraseña
    console.log("🔐 Hasheando contraseña...");
    const hashedPassword = await bcrypt.hash(adminData.password, 12);
    
    // Crear usuario
    const result = await db.collection("users").insertOne({
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
      createdAt: new Date()
    });
    
    console.log("✅ Usuario admin creado exitosamente!");
    console.log("📧 Email:", adminData.email);
    console.log("🔑 Password:", adminData.password);
    console.log("👤 Role:", adminData.role);
    console.log("🆔 ID:", result.insertedId);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
  
  process.exit(0);
}

createAdminUser();
