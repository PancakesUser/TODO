"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function startDB() {
    try {
        mongoose_1.default.connect(`${process.env.CLIENT_URI}`);
        console.log("Database conectada ✅🍀.");
    }
    catch (err) {
        if (err)
            throw new Error("Hubo un error al intentar conectar la base de datos!");
    }
}
exports.startDB = startDB;
