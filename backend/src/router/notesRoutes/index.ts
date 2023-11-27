import express from "express"
import Notes from "../../../database/Schemas/Notes"

const router: express.Router = express.Router();

interface newReqUser extends express.Request {
    user?: {
        _id?: string
        uid?: string
    }
}

router.get("/", async (req: newReqUser, res: express.Response) => {
    if(req.user) {
        const userNotes = await Notes.find({uid: req.user.uid}).exec();
        if(userNotes && userNotes.length > 0) {
            return res.status(200).send(userNotes)
        }else return res.status(200).send([])
    }else return res.status(404).send("User not logedIn")
});


router.post("/new", async (req: express.Request, res: express.Response) => {
    const {uid, title, description, date} = req.body;
    if(!uid) return res.status(404).send("UID ERROR!");
    if(!title) return res.status(404).send("TITLE IS REQUIRED!");

    try{
        await new Notes(
            {
                uid,
                title,
                description,
                date
            }
        ).save();
        return res.status(201).send("Created");
    }catch(err: any) {
        return res.status(404).send({error: err});
    }
});



router.post("/delete", async (req: express.Request, res: express.Response) => {
    const {nid} = req.body;
    if(!nid) return res.status(404).send("Note ID wasn't found!");
     try{
        await Notes.findOneAndDelete({nid: nid}).exec()
        return res.status(200).send("Done!")
     }catch(err: any) {
        if(err) {
            console.log(err);
            return res.status(404).send({error: "INTERNAL ERROR"})
        }
     }
});


router.post("/edit", async (req: express.Request, res: express.Response) => {
    const {nid, newTitle, newDescription} = req.body;
    console.log(nid, newTitle, newDescription)
    if(!nid) return res.status(404).send({error: "Note ID wasn't found!"});
    if(newTitle &&  !newDescription) {
        try{
            await Notes.findOneAndUpdate({nid}, {$set: {title: newTitle}}).exec();
            return res.status(200).send("Changed!")
        }catch(err: any) {
            if(err) {
                console.log(err);
                return res.status(404).send({error: "INTERNAL ERROR"});
            }
        }
    }else if(newTitle && newDescription) {
        try{
            await Notes.findOneAndUpdate({nid}, {$set: {title: newTitle, description: newDescription}}).exec();
            return res.status(200).send("Changed!")
        }catch(err: any) {
            if(err) {
                console.log(err)
                return res.status(404).send({error: "INTERNAL ERROR"});
            }
        }
    }else if(!newTitle && newDescription) {
        try{
            await Notes.findOneAndUpdate({nid}, {$set: {description: newDescription}}).exec();
            return res.status(200).send("Changed!")
        }catch(err: any) {
            if(err) {
                console.log(err)
                return res.status(404).send({error: "INTERNAL ERROR"});
            }
        }
    }
})

export {router as notesRoutes}