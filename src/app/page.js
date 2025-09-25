"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      });
      setEditingId(null);
    } else {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: "", email: "" });
    fetchUsers();
  }

  async function handleDelete(id) {
    await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  }

  function handleEdit(user) {
    setForm({ name: user.name, email: user.email });
    setEditingId(user._id);
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>CRUD de Usuarios</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: "10px" }}>
            <b>{user.name}</b> - {user.email}
            <button onClick={() => handleEdit(user)} style={{ marginLeft: "10px" }}>
              Editar
            </button>
            <button onClick={() => handleDelete(user._id)} style={{ marginLeft: "10px" }}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
