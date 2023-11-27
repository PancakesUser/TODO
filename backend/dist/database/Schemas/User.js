"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    uid: { type: String, required: true, unique: true },
    username: { type: String },
    global_name: { type: String },
    avatar: { type: String }
});
exports.default = (0, mongoose_1.model)("UserSchema2", userSchema);
