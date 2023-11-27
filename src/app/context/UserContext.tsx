'use client';
import React, { SetStateAction } from "react"

interface user {
    uid: string | null,
    username: string | null,
    global_name: string | null,
    avatar: string | null
}

type userContext = {
    storedUser: user | null,
    setstoredUser: React.Dispatch<SetStateAction<user | null>>
}

const UserContext = React.createContext<userContext | null>(null);

const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [storedUser, setstoredUser] = React.useState<user | null>(null)

    return(
        <UserContext.Provider value={{storedUser, setstoredUser}}>
            {children}
        </UserContext.Provider>
    )
}


const useUserContext = (): userContext => {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error("Contexto requerido");
    }

    return context;
}


export{
    UserContext,
    UserProvider,
    useUserContext
}

