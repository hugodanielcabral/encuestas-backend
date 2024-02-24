import Router from "express";
import { signup, signin, signout } from "../controllers/auth.controllers.js";
import {
  signupValidator,
  signinValidator,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/signin", signinValidator, signin);

router.post("/signup", signupValidator, signup);

router.post("/signout", signout);

export default router;
