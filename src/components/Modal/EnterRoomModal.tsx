import { z } from 'zod'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { X } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useContext, useRef, useState } from 'react'

import { UserContext } from '../../contexts/UserContext'
import { ModalContext } from '../../contexts/ModalContext'

import { api } from '../../libs/axios'

import styles from './index.module.css'

type FormDataProps = {
    "room-id": string,
    "room-password": string
}

const enterRoomSchema = z.object({
    "room-id": z.string().min(20, "O id da sala deve conter pelo menos 20 caracteres"),
    "room-password": z.string()
        .min(6, 'A Senha deve conter pelo menos 6 caracteres')
        .regex(/\d/, "A senha deve conter pelo menos um número")
})

export function EnterRoomModal(){
    const formRef = useRef<HTMLFormElement>(null)
    
    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext)

    const [formData, setFormData] = useState<FormDataProps>({
        "room-id": "",
        "room-password": ""
    })

    async function handleFormSubmit(evt: FormEvent){
        evt.preventDefault()

        if(user){
            try{
                enterRoomSchema.parse(formData)

                const res = await api.post("/enter-room",  {
                            data: {
                                roomId: formData['room-id'], 
                                userId: user.uid, 
                                roomType: "private", 
                                password: formData['room-password']
                            }
                        }
                    )

                if(res.status === 200){
                    toast.success("Bem vindo à sala!")
                    setIsModalOpen(null)
                    navigate(`/my-chats/${res.data.roomPath}`)
                }

            }
            catch(err){
                if(err instanceof z.ZodError){
                    toast.error(err.issues[0].message)
                    if(formRef.current){
                        formRef.current[err.issues[0].path[0]].focus()
                    }
                }

                if(err instanceof AxiosError){
                    if(err.response?.data.error === "Room does not exist"){
                        toast.error("Essa sala não existe")
                    }
                    if(err.response?.data.error === "Wrong password"){
                        toast.error("Senha errada")
                    }
                }

            }
            return 
        }

        toast.error("Você precisa estar logado para entrar em uma sala privada")

    }

    return (
        <>
            {
                isModalOpen === "enterRoomModalIsOpen" && (
                    <div className={styles.modalContainer}>
                    <strong className={styles.form}>Entre em uma sala</strong>
                    <button onClick={() => setIsModalOpen(null)}><X weight='bold'/></button>
                    
                    <form ref={formRef} className={styles.form} onSubmit={handleFormSubmit}>
                        <label htmlFor="room-id">Id da Sala</label>
                        <input id="room-id" type="text" onChange={(evt) => setFormData(state => {
                            return {
                                ...state,
                                "room-id": evt.target.value
                            }
                            
                        })}/>
        
                        <label htmlFor="room-password">Senha</label>
                        <input id="room-password" type="password" onChange={(evt) => setFormData(state => {
                            return {
                                ...state,
                                "room-password": evt.target.value
                            }
                        })}/>
        
                        <button>Entrar na Sala</button>
                    </form>
                </div>
                )
            }
    </>
    )
}