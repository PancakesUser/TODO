"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainPassport = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
exports.mainPassport = passport_1.default;
const morgan_1 = __importDefault(require("morgan"));
const router_1 = require("./router/router");
const Config_1 = require("../database/Config");
// Dotenv
dotenv_1.default.config();
(0, Config_1.startDB)();
const app = (0, express_1.default)();
var port = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, express_session_1.default)({
    secret: "aksdkadasda",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 2123 * 23123 * 64 * 64, secure: false }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Api
app.use("/api", router_1.mainRouter);
app.listen(port, () => { console.log(`Listening to port ${port}`); });
