"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.userRouter = router;
router.get("/", (req, res) => {
    if (req.user) {
        res.send(req.user);
    }
    else
        return res.status(404).send("There is not any user in req.user!");
});
router.get("/logout", (req, res) => {
    if (req.user) {
        try {
            req.destroy();
            res.status(200).send("Done!");
        }
        catch (err) {
            if (err)
                throw new Error("Hubo un error al hacer el logout: " + err);
        }
    }
    else
        return res.status(404).send("User wasn't logged!");
});
