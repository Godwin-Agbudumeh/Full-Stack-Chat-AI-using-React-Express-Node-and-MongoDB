import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
    },
    {timestamps: true}
);

//module.exports = mongoose.model("User", UserSchema);

export default mongoose.models.user || mongoose.model("user", userSchema);