import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";

// Middlewares (carpeta middlewares/)
import { logger } from "./middlewares/logger.js";
import { validarCredenciales } from "./middlewares/validarCredenciales.js";
import { validarToken } from "./middlewares/validarToken.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

/* ============================
   Ruta base
============================ */
app.get("/", (_req, res) => {
  res.json({ message: "API SoftJobs funcionando" });
});

/* ============================
   REGISTRAR USUARIO
   POST /usuarios
============================ */
app.post("/usuarios", validarCredenciales, async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO usuarios (email, password, rol, lenguage)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, rol, lenguage
    `;

    const values = [email, hashedPassword, rol || null, lenguage || null];

    const { rows } = await pool.query(query, values);

    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar usuario." });
  }
});

/* ============================
   LOGIN
   POST /login
============================ */
app.post("/login", validarCredenciales, async (req, res) => {
  try {
    const { email, password } = req.body;

    const { rows } = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const user = rows[0];

    const passwordValida = await bcrypt.compare(password, user.password);

    if (!passwordValida) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error en el inicio de sesión." });
  }
});

/* ============================
   OBTENER USUARIO (PROTEGIDA)
   GET /usuarios
============================ */
app.get("/usuarios", validarToken, async (req, res) => {
  try {
    // el middleware guardar el email decodificado en req.email
    const { rows } = await pool.query(
      "SELECT id, email, rol, lenguage FROM usuarios WHERE email = $1",
      [req.email]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener usuario." });
  }
});

/* ============================
   Levantar servidor
============================ */
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor encendido en puerto ${process.env.PORT || 3000}`);
});