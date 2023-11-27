"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordOauth = void 0;
const app_1 = require("../app");
Object.defineProperty(exports, "discordOauth", { enumerable: true, get: function () { return app_1.mainPassport; } });
const passport_discord_1 = __importDefault(require("passport-discord"));
const User_1 = __importDefault(require("../../database/Schemas/User"));
app_1.mainPassport.serializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
    return done(null, user._id);
}));
app_1.mainPassport.deserializeUser((_id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const serializedUser = yield User_1.default.findById({ _id }).exec();
    if (serializedUser) {
        return done(null, serializedUser);
    }
    else {
        return done(null, false);
    }
}));
app_1.mainPassport.use("discord", new passport_discord_1.default.Strategy({
    clientID: `1002792242810998814`,
    clientSecret: `085objeP5jgqfxDxp-kuYqSE0i3PC9z5`,
    scope: ["identify"],
    callbackURL: "http://localhost:3001/api/auth/discord/callback"
}, (acessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, avatar, global_name } = profile;
    const UserSchema = yield User_1.default.findOne({ uid: id }).exec();
    if (UserSchema) {
        UserSchema.avatar = `${avatar}`,
            UserSchema.username = `${username}`;
        yield UserSchema.save();
        return done(null, UserSchema);
    }
    else {
        try {
            yield new User_1.default({
                uid: id,
                global_name: global_name,
                avatar: avatar,
                username: username
            }).save();
            const createdUser = yield User_1.default.findOne({ uid: id }).exec();
            if (createdUser) {
                return done(null, createdUser);
            }
            else {
                return done(null, false);
            }
        }
        catch (err) {
            if (err) {
                return done(err, false);
            }
        }
    }
})));
