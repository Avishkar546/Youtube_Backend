import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

export async function uploadToCloudinary(filepath) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_APIKEY,
        api_secret: process.env.CLOUD_API_SECRET
    });

    if (!filepath) return null;
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(filepath, options);
        fs.unlinkSync(filepath);
        return result.secure_url;
    } catch (error) {
        console.error(error.message);
        fs.unlinkSync(filepath);
        return null;
    }
}