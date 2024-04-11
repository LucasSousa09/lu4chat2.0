import { z } from 'zod';
import { toast } from 'react-toastify';
import { FormEvent, useState } from "react";
import { Info } from '@phosphor-icons/react';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from '../libs/firebase-config';

import { FormContainer } from "../components/FormContainer";

import styles from './Register&LoginPages.module.css'

import { api } from '../libs/axios';

const registerSchema = z.object({
    username: z.string()
                .min(3, 'O nome de usuário deve ter no minímo 3 characteres')
                .max(20, 'O nome de usuário deve ter no máximo 20 characteres'),
    email: z.string().email("Email Inválido"),
    password: z.string()
        .min(6, 'A senha deve ter no minímo 6 characteres')
        .max(30, 'A senha deve ter no máximo 30 characteres')
        .regex(/[a-zA-Z]/, 'A senha deve conter uma letra')
        .regex(/\d/, "A senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*(),.?":{}|[\]<>_]/, 'A senha deve conter pelo menos um caracter especial'),
    passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não estão batendo",
    path: ["repeat-password"]
})

export function RegisterPage(){
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    async function createUserWithCredentials(evt: FormEvent){
        evt.preventDefault()

        try{
            registerSchema.parse({
                email,
                password,
                username,
                passwordConfirmation
            })

           const authRes = await createUserWithEmailAndPassword(auth, email, password)

           const res = await api.post("/create-user", {data: {userEmail: email, userName: username, userId: authRes.user.uid}})
           
           if(res.status === 201){
                toast.success("Usuário Criado com sucesso")
                navigate("/public-chats")
            }

            else{
                console.error(res.data)
                toast.error("Algo de errado aconteceu, tente novamente mais tarde!")
            }

        }
        catch(err){
            if(err instanceof z.ZodError){
                toast.error(err.issues[0].message)
            }

            if(err instanceof FirebaseError){
                if(err.code === "auth/email-already-in-use"){
                    toast.error("Esse email já foi cadastrado anteriormente")
                }
            }
        }
    }

    async function signInWithGoogle(){
        try{
            const authRes = await signInWithPopup(auth, googleProvider)

            console.log(authRes)
            
            const res = await api.post('/create-user', {data: {userEmail: authRes.user.email, userName: authRes.user.displayName, userId: authRes.user.uid}})
            
            if(res.status === 201){
                toast.success("Usuário Criado com sucesso")
                navigate("/public-chats")
            }
            else if(res.status === 200){
                toast.success("Usuário Logado com sucesso")
                navigate("/my-chats")
            }
            else{
                console.error(res.data)
                toast.error("Algo de errado aconteceu, tente novamente mais tarde!")
            }

        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <FormContainer>
            <div className={styles.formBox}>
                <header> 
                    <strong>Crie uma conta</strong>
                    <div className={styles.infoBox}>
                        <Info weight="bold" size={24}/>
                        <div className={styles.infoTooltip}>
                            <strong>Aviso</strong>
                            <ul>
                               <li>1 - É possível realizar o Cadastro utilizando apenas um método</li> 
                               <li>2 - Caso o cadastro seja realizado utilizando Email e Senha, é possível alterar o método para login com Google, mas o contrário não é possível</li>
                            </ul>
                        </div>
                    </div>
                </header>
                <form className={styles.form} action="">
                    <label htmlFor="username">Nome de Usuário</label>
                    <input id="username" type="text"  onChange={(evt) => setUsername(evt.target.value)}/>


                    <label htmlFor="email">Email</label>
                    <input id="email" type="text"  onChange={(evt) => setEmail(evt.target.value)}/>

                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password"  onChange={(evt) => setPassword(evt.target.value)}/>

                    <label htmlFor="password-confirmation">Repita sua senha</label>
                    <input id="password-confirmation" type="password" onChange={(evt) => setPasswordConfirmation(evt.target.value)} />

                    <button onClick={createUserWithCredentials} type="submit">
                        Criar conta
                    </button>
                </form>

                <span />

                <button onClick={signInWithGoogle}> Continue com Google </button>
            </div>
        </FormContainer>
    )
}