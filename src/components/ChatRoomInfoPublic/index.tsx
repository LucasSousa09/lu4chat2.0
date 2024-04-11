import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import { api } from "../../libs/axios";

import styles from "./ChatRoomInfoPublic.module.css"

type ChatRoomInfoProps = {
    id: string;
    roomName: string;
    roomType: string;
    roomDescription: string;

    enterRoom?: string | undefined;
}

export function ChatRoomInfoPublic({
    id,
    roomName, 
    roomType,
    roomDescription,
    enterRoom = undefined,
}: ChatRoomInfoProps) {
    const { user } = useContext(UserContext)

    const navigate = useNavigate()

    async function moveToRoom(){
        if(user?.email === undefined){
            toast.error("Por favor faça o Login antes de entrar em uma sala!")
            navigate('/login')
        }
        else {
            const res = await api.post('/enter-room', {data: {roomId: id, userId: user.uid, roomType: "public"}})

            if(res.status === 200){
                toast.success("Seja bem vindo à essa sala!")
                navigate(`/my-chats/${id}`)
            }

            else{
                toast.error("Ocorreu algum erro ao tentar entrar na sala, tente novamente mais tarde!")
            }
            
        }      
        
    }

    return (
        <div className={`${styles.chatRoomInfoContainer} ${enterRoom === id && styles.currentRoom}`}>
            <header>
                <strong>
                   {roomName}
                </strong>
                <span>
                    {roomType  === "private" ? "Privada" : "Pública"}
                </span>
            </header>
            <div>
                <span>
                    {roomDescription}
                </span>
                {
                    enterRoom !== id ? (
                        <button onClick={moveToRoom}>
                            Entrar                    
                        </button>
                    ) : (
                        <button>
                            Sair
                        </button>
                    )
                }
            </div>
        </div>
    )
}