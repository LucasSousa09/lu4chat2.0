import { ReactNode, useState } from "react";

import { Header } from "../components/Header";
import { MobileSidebar } from "../components/MobileSidebar";

import styles from './Layout.module.css'

export function Layout({children}: {children: ReactNode}){
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)

    return (
        <div className={styles.mainContainer} >
            <div className={styles.contentContainer}>
                <Header openSidebar={setIsSidebarOpen} />
                <MobileSidebar isSidebarOpen={isSidebarOpen} closeSidebar={setIsSidebarOpen}/>
                {children}
            </div>
        </div>
    )
}