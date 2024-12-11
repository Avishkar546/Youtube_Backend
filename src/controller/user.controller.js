import { asyncHandler } from "../utils/asyncHandler.utils.js";


export const registerUser = asyncHandler(async (req, res) => {
    res.status(201).json({
        success: true,
        message: "Demo user registered"
    });
})