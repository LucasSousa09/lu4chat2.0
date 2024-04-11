import { ReactNode } from "react";

import { Link } from 'react-router-dom'

import styles from './NavLink.module.css'


type NavLinkProps = {
    children: ReactNode,
    linkTo: string
} 

export function NavLink({ children, linkTo }: NavLinkProps){
   return (
        <Link className={styles.link}  to={linkTo}>
            {children}
        </Link>
   )
}