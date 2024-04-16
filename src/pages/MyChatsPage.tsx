import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MyChatsSidebar } from "../components/MyChatsSidebar";
import { MyChatsMessages } from "../components/MyChatsMessages";
import { MyChatsMessageSender } from "../components/MyChatsMessageSender";

import { api } from "../libs/axios";

import styles from './MyChatsPage.module.css'

import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";

type ChatRoom = {
    id: string; 
    name: string; 
    type: string; 
    description: string; 
}

export function MyChatsPage(){
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    const { chatId } = useParams()

    const [ chatRooms, setChatRooms ] = useState<ChatRoom[]>([])

    let roomName = null

    if(chatRooms.length > 0){
        roomName = chatRooms.map(rooms => {
            if(rooms.id === chatId){
                return rooms.name
            }
            return ""
        }).filter(roomName => roomName !== "").toString()
    }

    useEffect(() => {
        async function getUserRooms(){
            if(user){
                const { data: userRoomsData }: {data: {myRooms: ChatRoom[]}} = await api.post(`/get-user-rooms`, {userId: user.uid})
                setChatRooms(userRoomsData.myRooms)

                if(userRoomsData.myRooms.length === 0){
                    toast.error("Você ainda não entrou em uma sala")
                    navigate('/public-chats')
                }
            }

            return
        }

        getUserRooms()
    },[user, chatId])

    return (
        <div className={styles.myChatsContainer}>
            {
                user && (
                    <>
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
                                            userId={user.uid}
                                            chatName={roomName} 
                                            roomMessagesId={chatId}
                                        />
                                        <MyChatsMessageSender senderId={user.uid} senderName={user.displayName || ""} chatId={chatId}/>
                                    </>
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}