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

export const loginUserController = asyncHandler(async (req, res) => {
    // 1. Get the username/email, password
    // 2. Check for the user exist using user
    // 3. If user does not exist return 404
    // 4. Check for the password correct
    // 5. Generate accessToken, refreshToken for user
    // 6. Send the refreshToken back to client (cookies)


    const { username, email, password } = req.body;
    console.log(username, email, password);

    if (!username && !email) {
        throw new ApiError(401, "Invalid Credentials");
    }

    let userExist = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (!userExist) {
        throw new ApiError(404, "User doesn't exist");
    }

    let passwordCheck = await userExist.isPasswordCorrect(password);
    if (!passwordCheck) {
        throw new ApiError(401, "Invalid Credentials");
    }

    let accessToken = userExist.generateAccessToken();
    let refreshToken = userExist.generateRefreshToken();
    // console.log(accessToken, refreshToken);
    userExist.refreshToken = refreshToken;
    await userExist.save({ validateBeforeSave: false });
    // Convert mongoose document to plain object to manipulate it
    let user = userExist.toObject();
    delete user.password;
    delete user.refreshToken;
    console.log("UserExist: ", user);

    let options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(200, "Loggedin succesfully", { user, accessToken, refreshToken })
    );
})

export const logoutUserController = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
        {
            new: true
        }
    );

    let options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).
        json(new ApiResponse(200, "logout succesfully", {}))
})