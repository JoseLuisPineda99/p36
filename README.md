# P36 - Next.js JWT Authentication Project

Este proyecto implementa un sistema de autenticación con JWT usando Next.js 13+ (App Router), MongoDB Atlas y deployment en Vercel.

## 📋 Características

- ✅ **Autenticación JWT** con login/logout
- ✅ **Rutas API protegidas** con middleware
- ✅ **Roles de usuario** (user/admin)
- ✅ **MongoDB Atlas** como base de datos
- ✅ **Hasheo de contraseñas** con bcryptjs
- ✅ **Listo para producción** en Vercel

## 🚀 Nivel 1 - Configurar MongoDB Atlas

### 1.1 Crear cuenta en MongoDB Atlas
1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (usa el tier gratuito)

### 1.2 Configurar acceso
1. En "Database Access", crea un usuario con contraseña
2. En "Network Access", agrega tu IP (o 0.0.0.0/0 para todas)
3. Obtén la cadena de conexión desde "Connect"

### 1.3 Crear primer usuario admin
Conecta a tu base de datos y ejecuta:
```javascript
db.users.insertOne({
  email: "admin@example.com",
  password: "$2a$12$YourHashedPasswordHere", // usa bcrypt para hashear
  role: "admin",
  createdAt: new Date()
})
```

## 🔧 Nivel 2 - Configurar el proyecto para producción

### 2.1 Instalar dependencias
```bash
npm install
```

### 2.2 Configurar variables de entorno
Copia `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Completa las variables:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/p36?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura_aqui
```

### 2.3 Rutas API implementadas

#### `/api/login` (POST)
- **Función**: Autenticar usuario y devolver JWT
- **Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: `{ "token": "jwt_token", "user": {...} }`

#### `/api/protected` (GET/POST)
- **Función**: Ruta protegida que requiere JWT válido
- **Headers**: `Authorization: Bearer jwt_token`
- **Response**: Información del usuario autenticado

#### `/api/users` (GET/POST/DELETE)
- **Función**: CRUD de usuarios (solo admins)
- **GET**: Listar todos los usuarios
- **POST**: Crear nuevo usuario
- **DELETE**: Eliminar usuario por ID

### 2.4 Middleware de protección
El archivo `middleware.js` protege automáticamente las rutas:
- `/api/protected/*`
- `/api/users/*`

## 🌐 Nivel 3 - Desplegar en Vercel

### 3.1 Preparar el repositorio
```bash
# Commitear cambios
git add .
git commit -m "Configuración completa para producción"
git push origin main
```

### 3.2 Desplegar en Vercel
1. Ve a [Vercel](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa este repositorio
4. En "Environment Variables" agrega:
   - `MONGODB_URI`: Tu cadena de conexión de MongoDB Atlas
   - `JWT_SECRET`: Una clave secreta segura para JWT

### 3.3 Configurar dominio (opcional)
- En Vercel dashboard > Project > Settings > Domains
- Agrega tu dominio personalizado

## 🧪 Pruebas

### Desarrollo local
```bash
npm run dev
```

Ve a [http://localhost:3000](http://localhost:3000) y:
1. Haz login con tu usuario admin
2. Prueba la ruta protegida
3. Lista usuarios (solo admin)

### Producción
Una vez desplegado en Vercel, prueba las mismas funciones en tu URL de producción.

## 📁 Estructura del proyecto

```
├── lib/
│   ├── auth.js          # Funciones JWT (generar, verificar tokens)
│   └── mongodb.js       # Conexión a MongoDB Atlas
├── src/app/
│   ├── api/
│   │   ├── login/route.js     # Endpoint de login
│   │   ├── protected/route.js # Endpoint protegido
│   │   └── users/route.js     # CRUD de usuarios (admin)
│   ├── page.js          # Página principal de pruebas
│   └── layout.js        # Layout de Next.js
├── middleware.js        # Middleware de protección global
├── .env.example         # Variables de entorno de ejemplo
└── package.json         # Dependencias del proyecto
```

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcryptjs
- ✅ Tokens JWT con expiración (1 hora)
- ✅ Validación de roles para rutas admin
- ✅ Middleware de protección automática
- ✅ Sanitización de datos sensibles

## 🛠️ Tecnologías utilizadas

- **Next.js 15** (App Router)
- **MongoDB Atlas** (Base de datos)
- **JWT** (Autenticación)
- **bcryptjs** (Hasheo de contraseñas)
- **Vercel** (Deployment)
