"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Función para hacer login
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setToken(data.token);
        setMessage(`Login exitoso! Usuario: ${data.user.email} (${data.user.role})`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  }

  // Función para probar ruta protegida
  async function testProtected() {
    try {
      const res = await fetch("/api/protected", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage(`Acceso a ruta protegida exitoso! Usuario: ${data.user.email}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  }

  // Función para obtener usuarios (solo admins)
  async function getUsers() {
    try {
      const res = await fetch("/api/users", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setUsers(data.users);
        setMessage(`${data.users.length} usuarios encontrados`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "600px" }}>
      <h1>Proyecto P36 - JWT Authentication</h1>
      
      <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc" }}>
        <h2>1. Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "200px", marginRight: "10px", padding: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "200px", marginRight: "10px", padding: "5px" }}
            />
          </div>
          <button type="submit" style={{ padding: "8px 16px" }}>Login</button>
        </form>
        
        {token && (
          <div style={{ marginTop: "10px", fontSize: "12px" }}>
            <strong>Token:</strong> <span style={{ wordBreak: "break-all" }}>{token}</span>
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px", padding: "20px", border: "1px solid #ccc" }}>
        <h2>2. Probar Rutas</h2>
        <button 
          onClick={testProtected} 
          disabled={!token}
          style={{ padding: "8px 16px", marginRight: "10px" }}
        >
          Ruta Protegida
        </button>
        <button 
          onClick={getUsers} 
          disabled={!token}
          style={{ padding: "8px 16px" }}
        >
          Obtener Usuarios (Admin)
        </button>
      </div>

      {message && (
        <div style={{ 
          padding: "10px", 
          backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e8",
          border: `1px solid ${message.includes("Error") ? "#f44336" : "#4caf50"}`,
          marginBottom: "20px"
        }}>
          {message}
        </div>
      )}

      {users.length > 0 && (
        <div style={{ padding: "20px", border: "1px solid #ccc" }}>
          <h2>3. Lista de Usuarios</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id} style={{ marginBottom: "5px" }}>
                <strong>{user.email}</strong> - Role: {user.role}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "30px", padding: "20px", backgroundColor: "#f5f5f5" }}>
        <h3>📝 Instrucciones de uso:</h3>
        <ol>
          <li>Crear un usuario admin en MongoDB Atlas manualmente</li>
          <li>Configurar variables de entorno (.env.local)</li>
          <li>Hacer login con las credenciales</li>
          <li>Probar las rutas protegidas</li>
        </ol>
      </div>
    </div>
  );
}
