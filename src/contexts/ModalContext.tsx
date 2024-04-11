import { ReactNode, createContext, useState } from "react";

type ModalContextProps = {
    isModalOpen: "createRoomModalIsOpen"| "enterRoomModalIsOpen" | null,
    setIsModalOpen: React.Dispatch<React.SetStateAction<"createRoomModalIsOpen"| "enterRoomModalIsOpen" | null>>
}

type ModalContextProvider = {
    children: ReactNode
}

export const ModalContext = createContext({} as ModalContextProps)

export function ModalContextProvider({children}: ModalContextProvider){
    
    const [isModalOpen, setIsModalOpen] = useState<"createRoomModalIsOpen"| "enterRoomModalIsOpen" | null>(null)

    return (
       <ModalContext.Provider value={{isModalOpen, setIsModalOpen}}>
            {children}
       </ModalContext.Provider>
    )
}