import { ListDashes } from '@phosphor-icons/react'

import { NavLink } from "../NavLink"

import logoImg from '../../assets/logo_white.png'
import logoMini from '../../assets/logo_mini.png'

import styles from "./Header.module.css"

export function Header(){
    return (
        <header className={styles.header}>
            <button className={styles.button}>
                <ListDashes color='#FFF' weight="bold" size={32} />
            </button>
            <nav className={styles.nav} >
                <NavLink linkTo="/">
                    <img className={styles.logoImg} src={logoImg} alt="" />
                    <img className={styles.logoImgMini} src={logoMini} alt="" />
                </NavLink>
                <NavLink linkTo="/my-chats">Conversas</NavLink>
                <NavLink linkTo="/public-chats">Salas Públicas</NavLink>
                <div>
                    <NavLink linkTo="/register">Criar Conta</NavLink>
                    <NavLink linkTo="/login">Login</NavLink>
                </div>
            </nav>
        </header>
    )
}

// Faltam os botões "Criar Sala" e "Entrar em Sala"