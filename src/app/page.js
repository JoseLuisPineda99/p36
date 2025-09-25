export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Hola, esto es la p36</h1>
        <p>Esta es una práctica de deploy con Vercel.</p>
        <p>API disponibles:</p>
        <ul>
          <li><code>POST /api/login</code> → devuelve token</li>
          <li><code>GET /api/protected</code> → requiere token</li>
          <li><code>GET /api/users</code> → solo admins</li>
        </ul>
      </main>
    </div>
  );
}
