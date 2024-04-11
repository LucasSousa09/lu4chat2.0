import { ReactNode, createContext, useState } from "react";
import { User, onAuthStateChanged,  } from "firebase/auth";

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
    const [isFetching, setIsFetching] = useState(true)

    onAuthStateChanged(auth, (currentUser) => {
        setIsFetching(false)
        setUser(currentUser)
    })

    return (
       <UserContext.Provider value={{user}}>
            {
                !isFetching && children
            }
       </UserContext.Provider>
    )
}