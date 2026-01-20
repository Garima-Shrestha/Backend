import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authorizedMiddleware } from "../middlewares/authorization.middleware";

let authController = new AuthController();
const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/whoami", authorizedMiddleware, authController.getProfile);
export default router;