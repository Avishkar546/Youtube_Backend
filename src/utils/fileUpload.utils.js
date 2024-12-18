import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import path from "path";

export async function uploadToCloudinary(filepath) {
    if (!filepath) return null;
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_APIKEY,
        api_secret: process.env.CLOUD_API_SECRET
    });

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    let result_url;
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(filepath, options);
        result_url = result.secure_url;
    } catch (error) {
        console.error(error.message);
        result_url = null;
    } finally {
        const absolutePath = path.resolve(filepath);
        try {
            fs.unlinkSync(absolutePath);
            console.log("File deleted !!!")
        } catch (error) {
            console.log("Error deleting file: ", error.message);
        }

        return result_url;
    }
}