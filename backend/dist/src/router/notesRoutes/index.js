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
exports.notesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Notes_1 = __importDefault(require("../../../database/Schemas/Notes"));
const router = express_1.default.Router();
exports.notesRoutes = router;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const userNotes = yield Notes_1.default.find({ uid: req.user.uid }).exec();
        if (userNotes && userNotes.length > 0) {
            return res.status(200).send(userNotes);
        }
        else
            return res.status(200).send([]);
    }
    else
        return res.status(404).send("User not logedIn");
}));
router.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, title, description, date } = req.body;
    if (!uid)
        return res.status(404).send("UID ERROR!");
    if (!title)
        return res.status(404).send("TITLE IS REQUIRED!");
    try {
        yield new Notes_1.default({
            uid,
            title,
            description,
            date
        }).save();
        return res.status(201).send("Created");
    }
    catch (err) {
        return res.status(404).send({ error: err });
    }
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nid } = req.body;
    if (!nid)
        return res.status(404).send("Note ID wasn't found!");
    try {
        yield Notes_1.default.findOneAndDelete({ nid: nid }).exec();
        return res.status(200).send("Done!");
    }
    catch (err) {
        if (err) {
            console.log(err);
            return res.status(404).send({ error: "INTERNAL ERROR" });
        }
    }
}));
router.post("/edit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nid, newTitle, newDescription } = req.body;
    console.log(nid, newTitle, newDescription);
    if (!nid)
        return res.status(404).send({ error: "Note ID wasn't found!" });
    if (newTitle && !newDescription) {
        try {
            yield Notes_1.default.findOneAndUpdate({ nid }, { $set: { title: newTitle } }).exec();
            return res.status(200).send("Changed!");
        }
        catch (err) {
            if (err) {
                console.log(err);
                return res.status(404).send({ error: "INTERNAL ERROR" });
            }
        }
    }
    else if (newTitle && newDescription) {
        try {
            yield Notes_1.default.findOneAndUpdate({ nid }, { $set: { title: newTitle, description: newDescription } }).exec();
            return res.status(200).send("Changed!");
        }
        catch (err) {
            if (err) {
                console.log(err);
                return res.status(404).send({ error: "INTERNAL ERROR" });
            }
        }
    }
    else if (!newTitle && newDescription) {
        try {
            yield Notes_1.default.findOneAndUpdate({ nid }, { $set: { description: newDescription } }).exec();
            return res.status(200).send("Changed!");
        }
        catch (err) {
            if (err) {
                console.log(err);
                return res.status(404).send({ error: "INTERNAL ERROR" });
            }
        }
    }
}));
