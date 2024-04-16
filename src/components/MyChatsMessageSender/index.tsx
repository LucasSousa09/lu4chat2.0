import styles from './index.module.css'

import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import { PaperPlaneRight } from '@phosphor-icons/react'

import { api } from '../../libs/axios'

type MyChatsMessageSenderProps = {
    chatId: string,
    senderId: string,
    senderName: string
}

export function MyChatsMessageSender({chatId, senderId, senderName}: MyChatsMessageSenderProps){
    const [sendingMessage, setSendingMessage] = useState({
        message: "",
        isSending: false
    }) 
    
    async function handleMessageSenderSubmit(evt: FormEvent){
        evt.preventDefault()

        if(sendingMessage.message.trim() === ""){
            toast.error("Escreva alguma coisa antes de enviar uma mensagem!")
            return 
        }

        setSendingMessage(state => ({...state, isSending: true}))

        const res = await api.post('/send-message', {message: sendingMessage.message, chatId, senderId, senderName })

        if(res.status === 201){
            setSendingMessage(() => ({message: "", isSending: false}))
        }
        else{
            console.error("Algo de errado ocorreu tente novamente mais tarde!")
            setSendingMessage(state => ({...state, isSending: false}))
        }
    }

    return (
        <form onSubmit={handleMessageSenderSubmit} className={styles.messageSenderContainer}>
            <input
                id='message' 
                type="text" 
                value={sendingMessage.message} 
                onChange={(evt) => setSendingMessage(state => {
                                       return {...state, message: evt.target.value}
                                   }
            )}/>
            <button type="submit" disabled={sendingMessage.isSending}>
                Enviar
                <PaperPlaneRight weight="fill" size={20}/>
            </button>
        </form>
    )
}