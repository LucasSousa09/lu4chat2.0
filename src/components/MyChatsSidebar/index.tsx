import { ChatRoomInfo } from '../ChatRoomInfo'

import styles from './MyChatsSidebar.module.css'

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
    return (
        <div className={styles.sidebar}>
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