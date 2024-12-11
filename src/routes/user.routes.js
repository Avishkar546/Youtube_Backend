import express from 'express';
import { registerUserController } from "../controller/user.controller.js";
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/register', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
]), registerUserController);

export default router;