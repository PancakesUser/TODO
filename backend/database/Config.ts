import mongoose from "mongoose"


function startDB() {
    try{
        mongoose.connect(`${process.env.CLIENT_URI}`)
        console.log("Database conectada ✅🍀.")
    }catch(err: any) {
        if(err) throw new Error("Hubo un error al intentar conectar la base de datos!")
    }
}


export {startDB}