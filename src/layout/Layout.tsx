import { ReactNode } from "react";

import { Header } from "../components/Header";

import styles from './Layout.module.css'

export function Layout({children}: {children: ReactNode}){
    return (
        <div className={styles.mainContainer} >
            <div className={styles.contentContainer}>
                <Header />
                {children}
            </div>
        </div>
    )
}