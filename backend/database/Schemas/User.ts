import { Schema, model } from "mongoose"

type User = {
    uid: string
    username: string,
    global_name: string,
    avatar: string
}


const userSchema: Schema<User> = new Schema({
    uid: {type: String, required: true, unique: true},
    username: {type: String},
    global_name: {type: String},
    avatar: {type: String}
});


export default model<User>("UserSchema2", userSchema);