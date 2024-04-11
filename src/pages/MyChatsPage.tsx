import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MyChatsSidebar } from "../components/MyChatsSidebar";
import { MyChatsMessages } from "../components/MyChatsMessages";
import { MyChatsMessageSender } from "../components/MyChatsMessageSender";

import { api } from "../libs/axios";

import styles from './MyChatsPage.module.css'

import { UserContext } from "../contexts/UserContext";

type ChatRoom = {
    id: string; 
    name: string; 
    type: string; 
    description: string; 
}

export function MyChatsPage(){
    const { user } = useContext(UserContext)

    const { chatId } = useParams()

    const [ chatRooms, setChatRooms ] = useState<ChatRoom[]>([])

    useEffect(() => {
        async function getUserRooms(){
            if(user){
                const { data: userRoomsData }: {data: {myRooms: ChatRoom[]}} = await api.post(`/get-user-rooms`, {userId: user.uid})
                setChatRooms(userRoomsData.myRooms)
            }

            return
        }

        getUserRooms()
    },[user])

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
                            {/* <MyChatsMessages 
                                chatName={chatsDB.rooms[chatId].name} 
                                roomMessagesId={chatsDB.rooms[chatId].messagesId}
                                />
                            <MyChatsMessageSender /> */}
                        </>
                    )
                }
            </div>
        </div>
    )
}