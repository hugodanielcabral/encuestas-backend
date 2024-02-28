import Router from "express";
import {
  getEncuestas,
  getEncuesta,
  createEncuesta,
  updateEncuesta,
  deleteEncuesta,
} from "../controllers/encuestas.controllers.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/encuestas", isAuth, getEncuestas);

router.get("/encuestas/:id", isAuth, getEncuesta);

router.post("/encuestas", isAuth, createEncuesta);

router.put("/encuestas/:id", isAuth, updateEncuesta);

router.delete("/encuestas/:id", isAuth, deleteEncuesta);

export default router;
