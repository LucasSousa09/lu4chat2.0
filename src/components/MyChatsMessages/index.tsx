import { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'

import { database } from '../../libs/firebase-config'

import styles from './MyChatsMessages.module.css'

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

    console.log(userId)

    const [messages, setMessages] = useState<Message[]>([])
    const messagesRef = ref(database, roomMessagesId + '/messages')

    useEffect(() => {
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val()
            
            const messagesArray: Message[] = Object.values(data)

            setMessages(messagesArray.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        })
    },[])

    return (
        <>
            {
                chatName !== null ? (
                    <div className={styles.messagesContainer}>
                        <h1>{chatName}</h1>

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