import { useContext } from 'react';
import { ChatRoomInfo } from '../ChatRoomInfo'

import styles from './MyChatsSidebar.module.css'
import { SidebarContext } from '../../contexts/SidebarContext';
import { X } from '@phosphor-icons/react';

type MyChatsSidebarProps = {
    chatRooms: {
        id: string;
        roomName: string;
        roomType: string;
        roomDescription: string;
    
        enterRoom?: string | undefined;
    }[]
}

export function MyChatsSidebar({chatRooms}: MyChatsSidebarProps){
    const { myChatSidebarIsOpen, setMyChatSidebarIsOpen } = useContext(SidebarContext)

    return (
        <div className={`${styles.sidebar} ${myChatSidebarIsOpen === true && styles.active}`}>
            {
                myChatSidebarIsOpen === true && (
                    <button onClick={() => setMyChatSidebarIsOpen(false)}>
                        <X weight="bold"/>
                    </button>
                )
            }
            {
                chatRooms.map(rooms => (
                    <ChatRoomInfo 
                        key={rooms.id}
                        id={rooms.id} 
                        roomName={rooms.roomName} 
                        roomType={rooms.roomType}
                        roomDescription={rooms.roomDescription}
                        enterRoom={rooms.enterRoom}
                    />
                ))
            }
        </div>
    )
}