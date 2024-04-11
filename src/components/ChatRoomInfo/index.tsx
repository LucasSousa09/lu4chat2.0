import { useContext } from "react";
import { api } from "../../libs/axios";
import styles from "./ChatRoomInfo.module.css"
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

type ChatRoomInfoProps = {
    id: string;
    roomName: string;
    roomType: string;
    roomDescription: string;

    enterRoom?: string | undefined;
}

export function ChatRoomInfo({
    id,
    roomName, 
    roomType,
    roomDescription,
    enterRoom = undefined,
}: ChatRoomInfoProps) {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()


    async function leaveRoom(){
        if(user){
            const res = await api.delete(`/exit-room/${user.uid}/${id}`)

            if(res.status === 200){
                navigate(0)
                return
            }
            toast.error("Algo de errado aconteceu tente novamente mais tarde")

        }
        else{
            console.log("Faça login antes de tentar excluir uma conta")
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
                        <Link to={`/my-chats/${id}`}>
                            Entrar                    
                        </Link>
                    ) : (
                        <button onClick={leaveRoom}>
                            Sair
                        </button>
                    )
                }
            </div>
        </div>
    )
}