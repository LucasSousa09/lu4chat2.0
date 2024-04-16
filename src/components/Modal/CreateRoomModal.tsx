import { z } from 'zod'
import { toast } from 'react-toastify'
import { X } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useContext, useRef, useState } from 'react'

import { UserContext } from '../../contexts/UserContext'
import { ModalContext } from '../../contexts/ModalContext'

import { api } from '../../libs/axios'

import styles from './index.module.css'

type FormDataProps = {
    "room-name": string,
    "room-description": string,
    "room-type": string,
    "room-password"?: string
}

const createRoomSchema = z.object({
    "room-name": z.string()
                .min(3, 'O nome da sala deve ter no minímo 3 characteres')
                .max(30, 'O nome de usuário deve ter no máximo 30 characteres'),
    "room-description": z.string()
                .min(6, 'A descrição deve ter no minímo 6 caracteres')
                .max(40, 'A descrição deve ter no máximo 40 caracteres'),
    "room-type": z.string()
        .min(6, 'A senha deve ter no minímo 6 characteres')
        .max(30, 'A senha deve ter no máximo 30 characteres'),
    "room-password": z.string()
        .min(6, 'A Senha deve conter pelo menos 6 caracteres')
        .regex(/\d/, "A senha deve conter pelo menos um número")
})



export function CreateRoomModal(){
    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext)


    const [formData, setFormData] = useState<FormDataProps>({
        "room-name": "",
        "room-description": "",
        "room-type": "public",
        "room-password": "000000"
    })

    async function handleFormSubmit(evt: FormEvent){
        evt.preventDefault()

        if(user){
            try{
                createRoomSchema.parse(formData)                
                const res = await api.post("/create-room", {
                                                data: {
                                                    userId: user.uid, 
                                                    roomName: formData['room-name'], 
                                                    roomDescription: formData['room-description'],
                                                    roomType: formData['room-type'],
                                                    roomPassword: formData['room-password']
                                                }
                                        })

                if(res.status === 201){
                    toast.success("Sala criada com sucesso!")
                    setIsModalOpen(null)
                    navigate(`/my-chats/${res.data.roomId}`)
                }

            }
            catch(err){
                if(err instanceof z.ZodError){
                    toast.error(err.issues[0].message)
                    if(formRef.current){
                        formRef.current[err.issues[0].path[0]].focus()
                    }
                }
            }
            return
        }
        
        toast.error("Você precisa estar autenticado para criar uma sala")

    }

    return (
        <>
            {
                isModalOpen === "createRoomModalIsOpen" && (
                    <div className={styles.modalContainer}>
                        <strong className={styles.form}>Crie uma sala</strong>
                        <button onClick={() => setIsModalOpen(null)}><X weight='bold'/></button>
                        
                        <form ref={formRef} className={styles.form} onSubmit={handleFormSubmit}>
                            <label htmlFor="room-name">Nome da Sala</label>
                            <input id="room-name" type="text" onChange={(evt) => setFormData(state => {
                                return {
                                    ...state,
                                    "room-name": evt.target.value
                                }

                            })}/>

                            <label htmlFor="room-description">Descrição</label>
                            <input id="room-description" type="text" onChange={(evt) => setFormData(state => {
                                return {
                                    ...state,
                                    "room-description": evt.target.value
                                }

                            })}/>

                            <label htmlFor="room-type">Tipo de Sala</label>
                            <select id="room-type" onChange={(evt) => setFormData(state => {
                               if(evt.target.value === "public"){
                                    return {
                                        ...state,
                                        "room-type": evt.target.value,
                                        "room-password": "000000"
                                    }
                                }
                                return {
                                    ...state,
                                    "room-type":evt.target.value,
                                    "room-password": ""
                                }
                            })}>
                                <option value="public">Sala Pública</option>
                                <option value="private">Sala Privada</option>
                            </select>

                            {
                                formData['room-type'] === "private" && (
                                    <>
                                        <label htmlFor="room-password">Senha</label>
                                        <input id="room-password" type="password" onChange={(evt) => setFormData(state => {
                                            return {
                                                ...state,
                                                "room-password": evt.target.value
                                            }
                                        })}/>
                                    </>
                                )
                            }

                            <button>Criar Sala</button>
                        </form>
                    </div>
                )
            }
        </>
    )
}