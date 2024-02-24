import jwt from "jsonwebtoken";

//* Middleware para verificar si el usuario está autenticado
export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, "secret123456", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "No autorizado" });
    }

    req.userId = decoded.id;

    next();
  });
};