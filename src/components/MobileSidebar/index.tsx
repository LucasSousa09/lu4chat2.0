import { X } from '@phosphor-icons/react'

import { NavLink } from "../NavLink";

import logoImg from '../../assets/logo_white.png'

import styles from './MobileSidebar.module.css'

type MobileSidebarProps = {
    isSidebarOpen: boolean,
    closeSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export function MobileSidebar({ isSidebarOpen, closeSidebar }: MobileSidebarProps){
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
                                onClick={() => closeSidebar(state => !state)}
                            >
                                <X size={24} weight='bold' /> 
                            </button>
                        </header>
                        <nav className={styles.mobileNavbar}>
                            <NavLink linkTo="/my-chats">Conversas</NavLink>
                            <NavLink linkTo="/public-chats">Salas Públicas</NavLink>
                            <NavLink linkTo="/register">Criar Conta</NavLink>
                            <NavLink linkTo="/login">Login</NavLink>
                        </nav>
                    </div>
                ) : null
            }
        </>
    )
}