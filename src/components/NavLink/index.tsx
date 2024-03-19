import { ReactNode } from "react";
import styles from './NavLink.module.css'


type NavLinkProps = {
    children: ReactNode,
    linkTo: string
} 

export function NavLink({ children, linkTo }: NavLinkProps){
   return (
        <a className={styles.link}  href={linkTo}>
            {children}
        </a>
   )
}