import { ReactNode, createContext, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from '../libs/firebase-config'

type UserContextProps = {
    user: User | null
}

type UserContextProvider = {
    children: ReactNode
}

export const UserContext = createContext({} as UserContextProps)

export function UserContextProvider({children}: UserContextProvider){
    const [ user, setUser ] = useState<User | null>(null)

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    return (
       <UserContext.Provider value={{user}}>
            {children}
       </UserContext.Provider>
    )
}