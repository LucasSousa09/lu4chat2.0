import { useContext, ReactNode } from "react";
import { Navigate } from 'react-router-dom'

import { UserContext } from "../../contexts/UserContext";


type ProtectedrRoutesProps = {
    children: ReactNode
}

export function ProtectedRoute({children}: ProtectedrRoutesProps){
    const { user } = useContext(UserContext)

    if(!user){
        return <Navigate to={"/login"} />
    }

    return children
}