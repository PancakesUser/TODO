import express from "express"
const router: express.Router = express.Router()

router.get("/", (req: express.Request, res: express.Response) => {
    if(req.user) {
        res.send(req.user)
    }else return res.status(404).send("There is not any user in req.user!")
});

router.get("/logout", (req, res) => {
    if (req.isAuthenticated()) {
        // Cerrar sesión utilizando Passport
        req.logout((err) => {
            if(err) {
                return res.status(404).send("No se pudo cerrar la sesión")
            }
        });

        // Puedes redirigir al usuario a una página de inicio de sesión o enviar una respuesta
       return res.status(200).send("Sesión cerrada exitosamente");
    } else {
        res.status(404).send("El usuario no estaba autenticado");
    }
});

export {router as userRouter}