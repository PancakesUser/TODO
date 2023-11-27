"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const discord_1 = require("./authRoutes/discord");
const userRoutes_1 = require("./userRoutes");
const notesRoutes_1 = require("./notesRoutes");
const router = express_1.default.Router();
exports.mainRouter = router;
router.use("/auth", discord_1.authRoutes);
router.use("/user", userRoutes_1.userRouter);
router.use("/note", notesRoutes_1.notesRoutes);
