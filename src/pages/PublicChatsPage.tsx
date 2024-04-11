import { useEffect, useState } from 'react'

import { ChatRoomInfoPublic } from "../components/ChatRoomInfoPublic"
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
} | null

export function PublicChatsPage(){
    const [chatRooms, setChatRooms] = useState<Room[]>([])

    const roomsCollectionRef = collection(db, "rooms")

    useEffect(() => {
        const getRooms = async () => {
            try{
                const querySnapshot = await getDocs(roomsCollectionRef)
    
                const rooms = querySnapshot.docs.map((doc) => {
                    if(doc.data().type === "public"){
                        return {id: doc.id, ...doc.data()} as Room
                    }
                    return null
                })

                setChatRooms(rooms)  
            }
            catch(err){
                console.error(err)
            }
        }

        getRooms()
        //Removing the depences array creates a infinite Loop
    },[])

    return (
        <div className={styles.pageContainer}>
            <div>
                <strong>Faça novos amigos - Salas Públicas</strong>

                <div className={styles.publicChatsContainer}>
                    {
                        chatRooms.map(room => {
                                if(room){
                                    return (
                                        <ChatRoomInfoPublic 
                                            key={room.id}
                                            id={room.id} 
                                            roomName={room.name} 
                                            roomType={room.type}
                                            roomDescription={room.description} 
                                        />
                                    )
                                }
                                return null
                            })
                    }
                </div>
            </div>
        </div>
    )
}