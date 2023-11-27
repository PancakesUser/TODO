import {Schema, model} from "mongoose"
import {v4 as uuidv4} from "uuid"

type Note = {
    uid: string,
    nid: string,
    title: string,
    description: string,
    date: Date
}


const NotesSchema: Schema<Note> = new Schema({
    uid: {type: String, unique: false, required: true},
    nid: {type: String, unique: true},
    title: {type: String, required: true},
    description: {type: String, required: false, default: ""},
    date: {type: Date, default: Date.now(), required: true}
});



NotesSchema.pre("save", function(next) {
    // Generar el UUID solo si no se proporcionó uno
    if (!this.nid) {
        this.nid = uuidv4();
      }
    next();
})

export default model<Note>("Notes", NotesSchema);