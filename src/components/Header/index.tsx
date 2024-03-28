import { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { ListDashes } from '@phosphor-icons/react'

import { auth } from '../../libs/firebase-config'

import { NavLink } from "../NavLink"

import logoImg from "../../assets/logo_white.png"
import logoMini from "../../assets/logo_mini.png"

import styles from "./Header.module.css"

import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
    openSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export function Header({ openSidebar }: HeaderProps ){
    const { user } = useContext(UserContext)

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

    return (
        <header className={styles.header}>
            <button 
                className={styles.button}
                onClick={() => openSidebar(true)}
            >
                <ListDashes color='#FFF' weight="bold" size={32} />
            </button>
            <nav className={styles.nav} >
                <NavLink linkTo="/">
                    <img className={styles.logoImg} src={logoImg} alt="" />
                    <img className={styles.logoImgMini} src={logoMini} alt="" />
                </NavLink>
                <div>
                    <NavLink linkTo="/my-chats">Conversas</NavLink>
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