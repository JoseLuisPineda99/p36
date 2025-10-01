"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  // Función para hacer login
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setMessage(`Login exitoso! Usuario: ${data.user.username} (${data.user.role})`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  }

  // Función para obtener usuarios
  async function fetchUsers() {
    try {
      const res = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUsers(data.users);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  }

  // Función para crear o actualizar un usuario
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser ? `/api/users/${editingUser._id}` : "/api/users";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editingUser ? "Usuario actualizado" : "Usuario creado");
        setEmail("");
        setPassword("");
        setRole("user");
        setEditingUser(null);
        fetchUsers();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  }

  // Función para eliminar un usuario
  async function handleDelete(userId) {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Usuario eliminado");
        fetchUsers();
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error de conexión");
    }
  }

  // Función para cargar datos de un usuario en el formulario
  function handleEdit(user) {
    setEmail(user.email);
    setRole(user.role);
    setEditingUser(user);
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "600px" }}>
      <h1>Proyecto P36 - CRUD de Usuarios</h1>

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
      </div>

      {token && (
        <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ccc" }}>
          <h2>2. Crear/Editar Usuario</h2>
          <form onSubmit={handleSubmit}>
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
            <div style={{ marginBottom: "10px" }}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ padding: "5px" }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" style={{ padding: "8px 16px" }}>
              {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
          </form>
        </div>
      )}

      {message && (
        <div
          style={{
            padding: "10px",
            backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e8",
            border: `1px solid ${message.includes("Error") ? "#f44336" : "#4caf50"}`,
            marginBottom: "20px",
          }}
        >
          {message}
        </div>
      )}

      {users.length > 0 && (
        <div style={{ padding: "20px", border: "1px solid #ccc" }}>
          <h2>3. Lista de Usuarios</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id} style={{ marginBottom: "10px" }}>
                <strong>{user.email}</strong> - Role: {user.role}
                <button
                  onClick={() => handleEdit(user)}
                  style={{ marginLeft: "10px", padding: "5px 10px" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{ marginLeft: "10px", padding: "5px 10px" }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
