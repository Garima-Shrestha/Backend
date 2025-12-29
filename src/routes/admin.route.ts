import { Router } from "express";
import { AdminUserController } from "../controller/admin/admin.controller";
import { authorizedMiddleware, adminOnlyMiddleware } from "../middlewares/authorization.middleware";

let adminUserController = new AdminUserController();
const router = Router();

router.post('/', adminUserController.createUser);
router.get('/:id', adminUserController.getUserById);
router.get('/', authorizedMiddleware, adminOnlyMiddleware, adminUserController.getAllUsers); // middleware added
router.put('/:id', adminUserController.updateOneUser);
router.delete('/:id', adminUserController.deleteOneUser);

export default router;