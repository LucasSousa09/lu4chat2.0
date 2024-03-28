import { useEffect, useState } from 'react'

import { ChatRoomInfo } from "../components/ChatRoomInfo"
import styles from "./PublicChatsPage.module.css"

import { db } from '../libs/firebase-config' 
import { collection, getDocs } from 'firebase/firestore'

type Room = {
    id: string,
    allowedUsersIds: string[],
    description: string,
    messagesId: string,
    name: string,
    type: "public" | "private"
}

export function PublicChatsPage(){
    const [chatRooms, setChatRooms] = useState<Room[]>([])

    const roomsCollectionRef = collection(db, "rooms")

    useEffect(() => {
        const getRooms = async () => {
            try{
                const querySnapshot = await getDocs(roomsCollectionRef)
    
                const rooms = querySnapshot.docs.map((doc) => {                   
                    return {id: doc.id, ...doc.data()} as Room
                })

                setChatRooms(rooms)  
            }
            catch(err){
                console.error(err)
            }
        }

        getRooms()
    })

    return (
        <div className={styles.pageContainer}>
            <div>
                <strong>Faça novos amigos - Salas Públicas</strong>

                <div className={styles.publicChatsContainer}>
                    {
                        chatRooms.map(rooms => (
                            <ChatRoomInfo 
                                key={rooms.id}
                                id={rooms.id} 
                                roomName={rooms.name} 
                                roomType={rooms.type}
                                roomDescription={rooms.description} 
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}