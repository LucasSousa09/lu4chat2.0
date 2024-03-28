import styles from "./ChatRoomInfo.module.css"

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

    return (
        <div className={`${styles.chatRoomInfoContainer} ${enterRoom === id && styles.currentRoom}`}>
            <header>
                <strong>
                   {roomName}
                </strong>
                <span>
                    {roomType  === "private" ? "Pública" : "Privada"}
                </span>
            </header>
            <div>
                <span>
                    {roomDescription}
                </span>
                {
                    enterRoom !== id ? (
                        <a href={`/my-chats/${id}`}>
                            Entrar                    
                        </a>
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