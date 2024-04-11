import { signOut } from 'firebase/auth'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListDashes } from '@phosphor-icons/react'

import { auth } from '../../libs/firebase-config'

import { NavLink } from "../NavLink"

import logoImg from "../../assets/logo_white.png"
import logoMini from "../../assets/logo_mini.png"

import { UserContext } from "../../contexts/UserContext"
import { ModalContext } from '../../contexts/ModalContext'

import styles from "./Header.module.css"
import { SidebarContext } from '../../contexts/SidebarContext'

export function Header(){
    const { user } = useContext(UserContext)
    const { setIsSidebarOpen } = useContext(SidebarContext)
    const { setIsModalOpen } = useContext(ModalContext)

    const [openChatOptions, setOpenChatOptions] = useState(false)

    const navigate = useNavigate()

    async function logout(){
        try{
            await signOut(auth)

            navigate("/login")
        }
        catch(err){
            console.error(err)
        }
    }

    function handleOpenModal(whichModalToOpen: "createRoom" | "enterRoom"){
        if(whichModalToOpen === "createRoom"){
            setIsModalOpen(state => (state === "createRoomModalIsOpen" ? null : "createRoomModalIsOpen"))
        }
        if(whichModalToOpen === "enterRoom"){
            setIsModalOpen(state => (state === "enterRoomModalIsOpen" ? null : "enterRoomModalIsOpen"))
        }
        setIsSidebarOpen(false)
    }

    return (
        <header className={styles.header}>
            <button 
                className={styles.button}
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListDashes color='#FFF' weight="bold" size={32} />
            </button>
            <nav className={styles.nav} >
                <NavLink linkTo="/">
                    <img className={styles.logoImg} src={logoImg} alt="" />
                    <img className={styles.logoImgMini} src={logoMini} alt="" />
                </NavLink>
                <div>
                    <button onClick={() => setOpenChatOptions(state => !state)}>
                        Conversas
                    </button>
                    {
                        openChatOptions ? (
                            <div className={styles.chatOptions}>
                                <NavLink linkTo='/my-chats' >Minhas Conversas</NavLink>
                                <button onClick={() => handleOpenModal("createRoom")}>Criar Conversa</button>
                                <button onClick={() => handleOpenModal("enterRoom")}>Entrar na conversas</button>
                            </div>
                        ) : null
                    }

                    <NavLink linkTo="/public-chats">Salas Públicas</NavLink>
                    <div className={styles.userLinks}>
                        {
                            user?.email ? (
                                <button onClick={logout} className={styles.logoutButton}>Deslogar</button>
                            ) : (
                                <>
                                    <NavLink linkTo="/register">Criar Conta</NavLink>
                                    <NavLink linkTo="/login">Login</NavLink>        
                                </>     
                            )
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

// Faltam os botões "Criar Sala" e "Entrar em Sala"