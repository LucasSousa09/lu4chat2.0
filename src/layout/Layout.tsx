import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import { useState } from "react";
import { Outlet } from "react-router-dom" 

import { Header } from "../components/Header";
import { MobileSidebar } from "../components/MobileSidebar";

import styles from './Layout.module.css'
import { UserContextProvider } from "../contexts/UserContext";

export function Layout(){
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(false)

    return (
        <UserContextProvider>
            <div className={styles.mainContainer} >
                <ToastContainer position="bottom-right" theme="light"/>
                <div className={styles.contentContainer}>
                    <Header openSidebar={setIsSidebarOpen} />
                    <MobileSidebar isSidebarOpen={isSidebarOpen} closeSidebar={setIsSidebarOpen}/>
                    <Outlet />
                </div>
            </div>
        </UserContextProvider>
    )
}