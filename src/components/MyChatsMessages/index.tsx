import { toast } from 'react-toastify'
import { onValue, ref } from 'firebase/database'
import { ArrowLeft, Trash } from '@phosphor-icons/react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { database } from '../../libs/firebase-config'

import { UserContext } from '../../contexts/UserContext'
import { SidebarContext } from '../../contexts/SidebarContext'

import { api } from '../../libs/axios'

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
    const { chatId } = useParams()

    const { setMyChatSidebarIsOpen } = useContext(SidebarContext)

    const { user } = useContext(UserContext)

    const [messages, setMessages] = useState<Message[]>([])
    const [ownerId, setOwnerId] = useState("")
    const [warningIsOpen, setWarningIsOpen] = useState(false)

    const roomRef = ref(database, roomMessagesId)

    const navigate = useNavigate()

    async function handleDeleteRoom(){
        try{
            const res = await api.delete(`/delete-room/${user?.uid}/${chatId}`)

            await api.delete(`/exit-room/${user?.uid}/${chatId}`)

            if(res.status === 200){
                toast.info("A sala foi removida com sucesso!")
                navigate('/my-chats')
            }
        }
        catch(err){
            toast.error("Algo deu errado, tente novamente mais tarde")
        }
    }

    async function handleExitRoom(){
        if(chatId?.length === 24){
            await api.delete(`/exit-room/${user?.uid}/${chatId}`)
        }
    } 

    useEffect(() => {
        //Reset Messages when changing room
        setMessages([])

        //Fetch room messages
        onValue(roomRef, (snapshot) => {

            //If room does not exists navigate to my chats
            if(!snapshot.exists()){
                handleExitRoom()
                toast.error("Essa sala não existe, ou foi apagada pelo dono da sala!")
                navigate('/my-chats')
                return
            }

            const data = snapshot.val()

            setOwnerId(data.roomOwner)

            //If room is public and there are no messages, do anything
            if(data.roomType === "public" && data.messages === undefined){
                return
            }

            //If room is public and there are messages setMessages state
            if(data.roomType === "public" && data.messages !== undefined){
                const messagesArray: Message[] = Object.values(data.messages)
                setMessages(messagesArray.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
                
                return
            }

            //If the room is private and the allowedUses object does not exist, see if the user is owner
            if(data.allowedUsers === undefined){
                //If the user is not the owner send him away
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

            //On case that the object allowedUsers exists
            const allowedUsersArray: {id: string}[] = Object.values(data.allowedUsers)

            const userFound = allowedUsersArray.find(user => user.id === userId)

            //If the user is not registered in the room send him away
            if(userFound === undefined && data.roomOwner !== userId){
                toast.error("Você não pode entrar nessa sala")
                navigate("/my-chats")
                return
            }
            
            //If the user is registered show him the messages
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
                        {
                            warningIsOpen && (
                                <div className={styles.warningModal}>
                                    <strong>Você tem certeza que deseja excluir essa sala?</strong>
                                    <div>
                                        <button onClick={() => setWarningIsOpen(false)}>Cancelar</button>
                                        <button onClick={handleDeleteRoom}>Confirmar</button>
                                    </div>
                                </div>
                            )
                        }
                        <header>
                            <button 
                                className={styles.openMyChatsSidebarButton} 
                                onClick={() => setMyChatSidebarIsOpen(state => !state)}
                            > 
                                <ArrowLeft weight='bold'/> 
                            </button>
                            <h1>{chatName}</h1>
                            {
                                ownerId === user?.uid && (
                                    <button 
                                        className={styles.deleteRoomButton}
                                        onClick={() => setWarningIsOpen(state => !state)}
                                    >
                                        <Trash weight="bold"/>
                                    </button>
                                )
                            }
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