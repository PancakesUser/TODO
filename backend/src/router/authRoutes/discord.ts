import express from "express"
import { discordOauth } from "../../utils/passportConfig"

const router: express.Router = express.Router()


router.get("/discord", discordOauth.authenticate("discord", {successRedirect: "api/auth/discord/callback"}));
router.get("/discord/callback", discordOauth.authenticate("discord", {failureRedirect: "api/auth/discord"}), (req: express.Request, res: express.Response) => {
    res.redirect("http://localhost:3000/menu");
});

export {router as authRoutes}