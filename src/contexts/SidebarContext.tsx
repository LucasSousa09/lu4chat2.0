import { ReactNode, createContext, useState } from "react";

type SidebarContextProps = {
    isSidebarOpen: boolean,
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>,

    myChatSidebarIsOpen: boolean,
    setMyChatSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

type SidebarContextProvider = {
    children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextProps)

export function SidebarContextProvider({children}: SidebarContextProvider){
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [myChatSidebarIsOpen, setMyChatSidebarIsOpen] = useState(false)

    return (
       <SidebarContext.Provider value={{isSidebarOpen, setIsSidebarOpen, myChatSidebarIsOpen, setMyChatSidebarIsOpen}}>
            {children}
       </SidebarContext.Provider>
    )
}