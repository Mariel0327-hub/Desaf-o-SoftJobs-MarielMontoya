import jwt from "jsonwebtoken";

export const validarToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Token no enviado." });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.email = decoded.email;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};