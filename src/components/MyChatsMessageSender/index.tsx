import styles from './index.module.css'

import { PaperPlaneRight } from '@phosphor-icons/react'

export function MyChatsMessageSender(){
    return (
        <form className={styles.messageSenderContainer}>
            <input type="text" />
            <button type="submit">
                Enviar
                <PaperPlaneRight weight="fill" size={20}/>
            </button>
        </form>
    )
}