import { useState } from "react";

function Home() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingIndex !== null) {
        const updated = [...users];
        updated[editingIndex] = form;
        setUsers(updated);
        setEditingIndex(null);
      } else {
        setUsers([...users, form]);
      }
      setForm({ name: "", email: "" });
    };

    const handleEdit = (idx) => {
      setForm(users[idx]);
      setEditingIndex(idx);
    };

    const handleDelete = (idx) => {
      setUsers(users.filter((_, i) => i !== idx));
      if (editingIndex === idx) {
        setForm({ name: "", email: "" });
        setEditingIndex(null);
      }
    };

    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-xl">
          <h1 className="text-4xl font-bold">CRUD de Usuarios</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              type="email"
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
              {editingIndex !== null ? "Actualizar" : "Agregar"}
            </button>
          </form>
          <ul className="w-full mt-4">
            {users.map((user, idx) => (
              <li key={idx} className="flex justify-between items-center border-b py-2">
                <span>
                  <strong>{user.name}</strong> ({user.email})
                </span>
                <span className="flex gap-2">
                  <button
                    onClick={() => handleEdit(idx)}
                    className="bg-yellow-400 text-black px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
export default Home;
