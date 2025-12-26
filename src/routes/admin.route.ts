import { Router } from "express";
import { AdminUserController } from "../controller/admin/admin.controller";

let adminUserController = new AdminUserController();
const router = Router();

router.post('/users/', adminUserController.createUser);
router.get('/users/:id', adminUserController.getUserById);
router.get('/users/', adminUserController.getAllUsers);
router.put('/users/:id', adminUserController.updateOneUser);
router.delete('/users/:id', adminUserController.deleteOneUser);

export default router;