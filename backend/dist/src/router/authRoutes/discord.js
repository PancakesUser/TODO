"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const passportConfig_1 = require("../../utils/passportConfig");
const router = express_1.default.Router();
exports.authRoutes = router;
router.get("/discord", passportConfig_1.discordOauth.authenticate("discord", { successRedirect: "api/auth/discord/callback" }));
router.get("/discord/callback", passportConfig_1.discordOauth.authenticate("discord", { failureRedirect: "api/auth/discord" }), (req, res) => {
    res.redirect("http://localhost:3000/menu");
});
