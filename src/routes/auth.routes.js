import Router from "express";
import { signup, signin, signout } from "../controllers/auth.controller.js";
import {
  signupValidator,
  signinValidator,
} from "../validators/auth.validator.js";
import { validateResult } from "../helpers/validationResult.js";

const router = Router();

router.post("/signin", signinValidator, signin);

router.post("/signup", signupValidator, validateResult, signup);

router.post("/signout", signout);

export default router;
