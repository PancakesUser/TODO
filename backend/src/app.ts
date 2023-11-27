import dotenv from "dotenv"
import express from "express"
import session from "express-session"
import cors from "cors"
import passport from "passport"
import morgan from "morgan"
import { mainRouter } from "./router/router"
import { startDB } from "../database/Config"

// Dotenv
dotenv.config();
startDB();

const app: express.Application = express();
var port = process.env.PORT || 3001;
// Middleware
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan("dev"));
app.use(session(
    {
        secret: "aksdkadasda",
        resave: true,
        saveUninitialized: false,
        cookie: {maxAge: 2123*23123*64*64, secure: false}
    }
));
app.use(passport.initialize());
app.use(passport.session());
// Api
app.use("/api", mainRouter);


app.listen(port, () => {console.log(`Listening to port ${port}`)});

export {passport as mainPassport}