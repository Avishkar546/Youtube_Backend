import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { User } from "../models/user.models.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    // console.log(req.headers.authorization);
    // console.log(req.cookies.accessToken);

    const token =
        req?.cookies?.accessToken ||
        (req?.headers?.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]);
    // console.log('token in verifyJWT: ', token);
    if (!token) {
        throw new ApiError(401, "Unauthorized access");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id);
    if (!user) {
        throw new Error(401, "Unauthorized access");
    }

    req.user = user;
    next();
})