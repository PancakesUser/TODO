import { mainPassport } from "../app"
import DiscordStrategy, { Profile } from "passport-discord"
import User from "../../database/Schemas/User"

interface newProfile extends Profile {
    global_name?: string
}


interface newUser extends Express.User{
    _id?: string
}


mainPassport.serializeUser(async (user: newUser, done) => {
    return done(null, user._id)
});

mainPassport.deserializeUser(async (_id: string, done) => {
    const serializedUser = await User.findById({_id}).exec();
    if(serializedUser) {
        return done(null, serializedUser)
    }else{
        return done(null, false);
    }
});

mainPassport.use("discord", new DiscordStrategy.Strategy({
    clientID: `1002792242810998814`,
    clientSecret: `085objeP5jgqfxDxp-kuYqSE0i3PC9z5`,
    scope: ["identify"],
    callbackURL: "http://localhost:3001/api/auth/discord/callback"
}, async (acessToken, refreshToken, profile: newProfile, done) => {
    const {id, username, avatar, global_name} = profile;

    const UserSchema = await User.findOne({uid: id}).exec();
    if(UserSchema) {
        UserSchema.avatar= `${avatar}`,
        UserSchema.username = `${username}`
        await UserSchema.save()
        return done(null, UserSchema)
    }else{
        try{
             await new User({
                uid: id,
                global_name: global_name,
                avatar: avatar, 
                username: username
            }).save();


            const createdUser = await User.findOne({uid: id}).exec();
            if(createdUser) {
                return done(null, createdUser)
            }else{
                return done(null, false)
            }
        }catch(err: any) {
            if(err) {
                return done(err, false);
            }
        }
    }
}));


export {mainPassport as discordOauth}