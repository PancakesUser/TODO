import axios, { AxiosPromise } from "axios"
axios.defaults.baseURL = "http://localhost:3001/api"

async function getUserFromApi() {
    const User = await axios({
        method: "GET",
        url: "/user",
        withCredentials: true
    });

    if(User.status === 200) {
        return User.data
    }else{
        return {status: User.status, data: User.data}
    }
}


async function getUserNotes(uid: string) {
    const Notes = await axios({
        method: "GET",
        url: "/note/",
        data: {uid},
        withCredentials: true
    });

    if(Notes.status === 200) {
        return Notes.data
    }else{
        return []
    }
}


async function logoutUser() {
    try{
        await axios({
            method: "GET",
            url: "/user/logout",
            withCredentials: true
        });
        console.log("El usuario cerró la sesión.")
    }catch(err: any) {
        if(err) console.log(err);
    }
}


async function createNote(uid: string | null, title: string | null, description: string | null) {
    try{
        await axios({
            method: "POST",
            url: "/note/new",
            data: {uid, title, description}
        });
        console.log("Se creó la nota!")
    }catch(err: any) {
        if(err) throw new Error("Hubo un error al intentar crear una nueva nota!")
    }
}

async function editNote(nid: string, title: string | null, description: string | null) {
    try{
        await axios({
            method: "POST",
            url: "/note/edit",
            withCredentials: true,
            data: {nid, newTitle: title, newDescription: description}
        });
        console.log("Editado!")
    }catch(err: any) {
        if(err) console.error(err);
    }
}



async function deleteNote(nid: string) {
    try{
        await axios({
            method: "POST",
            url: "/note/delete",
            withCredentials: true,
            data: {nid}
        });
        return 200;
    }catch(err: any) {
        console.log(err)
        if(err) return 500
    }
}

export {getUserFromApi, getUserNotes, deleteNote, editNote, createNote, logoutUser}