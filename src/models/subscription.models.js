import mongoose, { Schema } from "mongoose";

export const subscription = mongoose.model(subscription, new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
}))