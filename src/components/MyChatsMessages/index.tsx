import { toast } from 'react-toastify'
import { useContext, useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { ArrowLeft } from '@phosphor-icons/react'
import { useNavigate, useParams } from 'react-router-dom'

import { database } from '../../libs/firebase-config'

import styles from './MyChatsMessages.module.css'
import { SidebarContext } from '../../contexts/SidebarContext'

type MyChatsMessages = {
    chatName: string | null
    roomMessagesId: string,
    userId: string
}

type Message = {
    senderName: string,
    senderId: string,
    message: string,
    createdAt: string,
}

export function MyChatsMessages({roomMessagesId, chatName, userId}: MyChatsMessages){
    const { chatId } = useParams()

    const { setMyChatSidebarIsOpen } = useContext(SidebarContext)

    const [messages, setMessages] = useState<Message[]>([])
    const roomRef = ref(database, roomMessagesId)

    const navigate = useNavigate()

    useEffect(() => {
        setMessages([])

        onValue(roomRef, (snapshot) => {

            if(!snapshot.exists()){
                navigate('/my-chats')
                return
            }

            const data = snapshot.val()

            if(data.roomType === "public" && data.messages === undefined){
                return
            }

            if(data.roomType === "public" && data.messages !== undefined){
                const messagesArray: Message[] = Object.values(data.messages)
                setMessages(messagesArray.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
                
                return
            }

            //If the room is private

            if(data.allowedUsers === undefined){
                if(data.roomOwner !== userId){
                    toast.error("Você não pode entrar nessa sala")
                    navigate('/my-chats')
                    
                    return
                }

                if(data.messages !== undefined){
                    const messagesArray: Message[] = Object.values(data.messages)
                    setMessages(messagesArray.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    
                    return
                }

                return
            }


            const allowedUsersArray: {id: string}[] = Object.values(data.allowedUsers)

            const userFound = allowedUsersArray.find(user => user.id === userId)

            if(userFound === undefined && data.roomOwner !== userId){
                toast.error("Você não pode entrar nessa sala")
                navigate("/my-chats")
                return
            }
            
            if(data.messages !== undefined){
                const messagesArray: Message[] = Object.values(data.messages)
                setMessages(messagesArray.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))

                return
            }
        })
    },[chatId])

    return (
        <>
            {
                chatName !== null ? (
                    <div className={styles.messagesContainer}>
                        <header>
                            <button onClick={() => setMyChatSidebarIsOpen(state => !state)}> <ArrowLeft weight='bold'/> </button>
                            <h1>{chatName}</h1>
                        </header>

                        {  messages.length > 0 &&
                            messages.map(message => (
                                <div key={message.createdAt} className={message.senderId === userId ? `${styles.message + " " + styles.messageSender}` : styles.message}>
                                    <strong>{message.senderName}</strong>

                                    <span>{message.message}</span>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className={styles.messagesContainer}></div>
                )     
            }            
        </>
    )
}