import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Header } from "../components/Header";
import { MobileSidebar } from "../components/MobileSidebar";
import { EnterRoomModal } from "../components/Modal/EnterRoomModal";
import { CreateRoomModal } from "../components/Modal/CreateRoomModal";

import { UserContextProvider } from "../contexts/UserContext";

import styles from './Layout.module.css'
import { ModalContextProvider } from "../contexts/ModalContext";
import { SidebarContextProvider } from "../contexts/SidebarContext";

export function Layout(){  
    return (
        <UserContextProvider>
            <ModalContextProvider>
                <SidebarContextProvider>
                    <div className={styles.mainContainer} >
                        <ToastContainer position="bottom-right" theme="light"/>
                        <div className={styles.contentContainer}>
                            <Header />    
                            <EnterRoomModal />
                            <CreateRoomModal />
                            <MobileSidebar />
                            <Outlet />
                        </div>
                    </div>
                </SidebarContextProvider>
            </ModalContextProvider>
        </UserContextProvider>
    )
}