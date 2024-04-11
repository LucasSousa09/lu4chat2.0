import { X } from '@phosphor-icons/react'

import { NavLink } from "../NavLink";

import logoImg from '../../assets/logo_white.png'

import styles from './MobileSidebar.module.css'
import { SidebarContext } from '../../contexts/SidebarContext';
import { useContext } from 'react';
import { ModalContext } from '../../contexts/ModalContext';

export function MobileSidebar(){
    const { setIsModalOpen } = useContext(ModalContext)
    const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)

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
        <>
            {
                isSidebarOpen ? (
                    <div className={styles.sidebarContainer}>
                        <header>
                            <NavLink linkTo='/'>
                                <img src={logoImg} alt="" />
                            </NavLink>
                            <button
                                onClick={() => setIsSidebarOpen(state => !state)}
                            >
                                <X size={24} weight='bold' /> 
                            </button>
                        </header>
                        <nav className={styles.mobileNavbar}>
                            <NavLink linkTo="/my-chats">Conversas</NavLink>
                            <NavLink linkTo="/public-chats">Salas Públicas</NavLink>
                            <NavLink linkTo="/register">Criar Conta</NavLink>
                            <button onClick={() => handleOpenModal("createRoom")}>Criar uma Sala</button>
                            <button onClick={() => handleOpenModal("enterRoom")}>Entrar em uma Sala</button>
                            <NavLink linkTo="/login">Login</NavLink>
                        </nav>
                    </div>
                ) : null
            }
        </>
    )
}