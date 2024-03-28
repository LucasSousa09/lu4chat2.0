import { z } from 'zod';
import { toast } from 'react-toastify';
import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from '../libs/firebase-config';

import { FormContainer } from "../components/FormContainer";

import styles from './Register&LoginPages.module.css'

const registerSchema = z.object({
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
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    async function createUser(evt: FormEvent){
        evt.preventDefault()

        try{
            registerSchema.parse({
                email,
                password,
                passwordConfirmation
            })

           await createUserWithEmailAndPassword(auth, email, password)

           navigate("/public-chats")
        }
        catch(err){
            if(err instanceof z.ZodError){
                toast.error(err.issues[0].message)
            }
            else{
                console.error(err)
            }
        }
    }

    async function signInWithGoogle(){
        try{
            await signInWithPopup(auth, googleProvider)

            navigate("/public-chats")
        }
        catch(err){
            console.error(err)
        }
    }

    return (
        <FormContainer>
            <div className={styles.formBox}>
                <strong> Crie uma conta </strong>
                <form className={styles.form} action="">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text"  onChange={(evt) => setEmail(evt.target.value)}/>

                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password"  onChange={(evt) => setPassword(evt.target.value)}/>

                    <label htmlFor="password-confirmation">Repita sua senha</label>
                    <input id="password-confirmation" type="password" onChange={(evt) => setPasswordConfirmation(evt.target.value)} />

                    <button onClick={createUser} type="submit">
                        Criar conta
                    </button>
                </form>

                <span />

                <button onClick={signInWithGoogle}> Continue com Google </button>
            </div>
        </FormContainer>
    )
}