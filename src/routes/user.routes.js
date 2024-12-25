import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
    changeAvatarController,
    changePasswordController,
    getCurrentUserController,
    getProfileController,
    getWatchHistoryController,
    loginUserController,
    logoutUserController,
    refreshAccessTokenController,
    registerUserController
} from "../controller/user.controller.js";

const router = express.Router();

router.post('/register', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
]), registerUserController);
router.route("/login").post(loginUserController);
router.route("/refreshToken").get(refreshAccessTokenController)


// Secured Routes
router.route("/logout").post(verifyJWT, logoutUserController);
router.route("/change-password").post(verifyJWT, changePasswordController);
router.route("/get-user").get(verifyJWT, getCurrentUserController);
router.route("/change-profile").post(upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
]), verifyJWT, changeAvatarController);
router.route("/get-profile_details/:username").get(verifyJWT, getProfileController);
router.route("/get-watch-history").get(verifyJWT, getWatchHistoryController)

export default router;