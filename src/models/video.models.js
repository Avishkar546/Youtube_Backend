import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: { type: String, required: true },
    duration: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: true
    }

}, { timestamps: true });

export const Video = mongoose.model('Video', videoSchema);