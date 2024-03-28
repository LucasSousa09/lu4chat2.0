import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MyChatsSidebar } from "../components/MyChatsSidebar";
import { MyChatsMessages } from "../components/MyChatsMessages";
import { MyChatsMessageSender } from "../components/MyChatsMessageSender";

import styles from './MyChatsPage.module.css'

import chatsDB from '../../mockDB.json'

type ChatRoom = {
    id: string; 
    name: string; 
    description: string; 
    type: string; 
    allowedUsersIds: string[]; 
    messagesId: string;
}

export function MyChatsPage(){
    const { chatId } = useParams()

    const [ chatRooms, setChatRooms ] = useState<ChatRoom[]>([])

    useEffect(() => {
        setChatRooms(Object.values(chatsDB.rooms))
    },[])

    return (
        <div className={styles.myChatsContainer}>
            <MyChatsSidebar chatRooms={
                chatRooms.map(rooms =>({
                    id: rooms.id,
                    roomName: rooms.name,
                    roomType: rooms.type,
                    roomDescription: rooms.description,
                    enterRoom: chatId
                }))
            } />
            <div className={styles.messagesContainer}>
                {
                    chatId !== undefined && (
                        <>
                            <MyChatsMessages 
                                chatName={chatsDB.rooms[chatId].name} 
                                roomMessagesId={chatsDB.rooms[chatId].messagesId}
                                />
                            <MyChatsMessageSender />
                        </>
                    )
                }
            </div>
        </div>
    )
}