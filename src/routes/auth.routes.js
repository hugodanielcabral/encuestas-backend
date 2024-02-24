import Router from "express";
import { signup, signin, signout } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/signout", signout);

export default router;
