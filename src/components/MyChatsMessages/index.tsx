import styles from './MyChatsMessages.module.css'

import mockDB from '../../../mockDB.json'
import { useEffect, useState } from 'react'

type MyChatsMessages = {
    chatName: string
    roomMessagesId: string
}

type Message = {
    sender: string,
    senderId: string,
    content: string,
    createdAt: string,
}


export function MyChatsMessages({roomMessagesId, chatName}: MyChatsMessages){
    const [messages, setMessages] = useState<Message[]>([])

    const messagesArray = Object.values(mockDB.messages[roomMessagesId])

    useEffect(() => {
        setMessages(messagesArray)
    },[])

    console.log(messages)

    return (
        <div className={styles.messagesContainer}>
            <h1>{chatName}</h1>

            {
                messages.map(message => (
                    <div className={styles.message}>
                        <strong>{message.sender}</strong>

                        <span>{message.content}</span>
                    </div>
                ))
            }

        </div>
    )
}