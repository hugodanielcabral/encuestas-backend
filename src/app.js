import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import encuestasRoutes from "./routes/encuestas.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", authRoutes);
app.use("/api", encuestasRoutes);
app.use("/api", categoriasRoutes);

export default app;
