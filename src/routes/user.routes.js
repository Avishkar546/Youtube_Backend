import express from 'express';
import { loginUserController, logoutUserController, registerUserController } from "../controller/user.controller.js";
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
]), registerUserController);
router.route("/login").post(loginUserController);


// Secured Routes
// router.route("/login").post(verifyJWT, logoutUserController);
router.route("/logout").post(verifyJWT, logoutUserController);

export default router;