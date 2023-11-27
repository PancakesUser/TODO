"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const NotesSchema = new mongoose_1.Schema({
    uid: { type: String, unique: false, required: true },
    nid: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    date: { type: Date, default: Date.now(), required: true }
});
NotesSchema.pre("save", function (next) {
    // Generar el UUID solo si no se proporcionó uno
    if (!this.nid) {
        this.nid = (0, uuid_1.v4)();
    }
    next();
});
exports.default = (0, mongoose_1.model)("Notes", NotesSchema);
