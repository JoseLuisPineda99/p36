export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <h1 className="text-4xl font-bold">Hola, esto es la p36</h1>
       <p>Esta es una práctica de deploy con Vercel.</p>
      {/* Formulario para crear un nuevo elemento */}
      <form className="flex flex-col gap-2 w-full max-w-md" method="POST" action="/api/items">
        <h2 className="text-xl font-semibold">Crear nuevo ítem</h2>
        <input name="name" type="text" placeholder="Nombre" required className="border p-2 rounded" />
        <input name="description" type="text" placeholder="Descripción" required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Crear</button>
      </form>

      {/* Formulario para leer un elemento por ID */}
      <form className="flex flex-col gap-2 w-full max-w-md mt-8" method="GET" action="/api/items">
        <h2 className="text-xl font-semibold">Buscar ítem por ID</h2>
        <input name="id" type="text" placeholder="ID del ítem" required className="border p-2 rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Buscar</button>
      </form>

      {/* Formulario para actualizar un elemento */}
      <form className="flex flex-col gap-2 w-full max-w-md mt-8" method="POST" action="/api/items/update">
        <h2 className="text-xl font-semibold">Actualizar ítem</h2>
        <input name="id" type="text" placeholder="ID del ítem" required className="border p-2 rounded" />
        <input name="name" type="text" placeholder="Nuevo nombre" className="border p-2 rounded" />
        <input name="description" type="text" placeholder="Nueva descripción" className="border p-2 rounded" />
        <button type="submit" className="bg-yellow-500 text-white p-2 rounded">Actualizar</button>
      </form>

      {/* Formulario para eliminar un elemento */}
      <form className="flex flex-col gap-2 w-full max-w-md mt-8" method="POST" action="/api/items/delete">
        <h2 className="text-xl font-semibold">Eliminar ítem</h2>
        <input name="id" type="text" placeholder="ID del ítem" required className="border p-2 rounded" />
        <button type="submit" className="bg-red-500 text-white p-2 rounded">Eliminar</button>
      </form>
      </main>
    </div>
  );
}
