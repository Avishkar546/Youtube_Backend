import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { uploadToCloudinary } from "../utils/fileUpload.utils.js";
import { User } from './../models/user.models.js';


export const registerUserController = asyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body;

    // if we don't add curly braces in arrow function it will return automatically.
    if ([username, email, fullName, password].some(ele => ele?.trim() === "")) {
        throw new ApiError(400, "Required mandatory fields");
    }

    let existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "Required unique email and username");
    }

    let file = req.files;
    let avatarPath = file?.avatar[0]?.path;
    let covrerImagePath = file?.cover?.cover[0]?.path;
    if (!avatarPath) {
        throw new ApiError(400, "File upload failed");
    }

    const cloudinary_avatar_url = await uploadToCloudinary(avatarPath);
    const cloudinary_cover_url = await uploadToCloudinary(covrerImagePath);

    if (!cloudinary_avatar_url) {
        throw new ApiError(400, "File upload failed to cloudinary");
    }

    let user = await User.create({
        username: username.toLowerCase(),
        email,
        fullName,
        password,
        avtar: cloudinary_avatar_url,
        covrerImage: cloudinary_cover_url || "",

    });

    user = await User.findById(user?._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(500, "Error while registering user");
    }

    return res.status(201).json(new ApiResponse(200, "User registered successfully", user));
})