# Desafío Soft Jobs - Backend

Backend desarrollado en Node.js con Express para el desafío Soft Jobs.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- bcrypt
- JSON Web Token (JWT)
- dotenv

## Instalación

1. Clonar el repositorio
   git clone# Desafío Soft Jobs - Backend

Backend desarrollado en Node.js con Express para el desafío Soft Jobs.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- bcrypt
- JSON Web Token (JWT)
- dotenv

## Instalación

1. Clonar el repositorio


git clone https://github.com/TU-USUARIO/Desaf-o-SoftJobs-MarielMontoya.git


2. Instalar dependencias


npm install


3. Crear archivo `.env` con:


PORT=3000
JWT_SECRET=tu_clave_secreta


4. Ejecutar el servidor


npm run dev


## Endpoints

### POST /usuarios
Registra un nuevo usuario (contraseña encriptada).

### POST /login
Autentica usuario y devuelve token JWT.

### GET /usuarios
Ruta protegida que devuelve información del usuario autenticado.

---

Desarrollado por Mariel A. Montoya
