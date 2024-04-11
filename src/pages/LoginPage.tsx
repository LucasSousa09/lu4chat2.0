import { z } from "zod"
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { Info } from "@phosphor-icons/react";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../libs/firebase-config";

import { FormContainer } from "../components/FormContainer";

import styles from './Register&LoginPages.module.css'

const signInSchema = z.object({
    email: z.string().email('Email Inválido'),
    password: z.string()
                .min(6, 'A senha deve ter no minímo 6 characteres')
                .max(30, 'A senha deve ter no máximo 30 characteres')
                .regex(/[a-zA-Z]/, 'A senha deve conter uma letra')
                .regex(/\d/, "A senha deve conter pelo menos um número")
                .regex(/[!@#$%^&*(),.?":{}|[\]<>_]/, 'A senha deve conter pelo menos um caracter especial'),
})

export function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    async function signInWithEmail(evt: FormEvent){
        evt.preventDefault()

        try{
            signInSchema.parse({
                email,
                password
            })

            await signInWithEmailAndPassword(auth, email, password)

            toast.success("Usuário Logado com sucesso!")
            navigate("/my-chats")
        }
        catch(err){
            if(err instanceof z.ZodError){
                toast.error(err.issues[0].message)
            }
            else if(err instanceof FirebaseError){
                if(err.code === "auth/invalid-credential"){
                    toast.error("Senha ou email inválidos")
                }
                if(err.code === "auth/too-many-requests"){
                    toast.error("Acesso temporiamente negado, devido à muitas tentivas de login malsucedidas")
                }
            }
        }
    }

    async function signInWithGoogle(){
        try{
            await signInWithPopup(auth, googleProvider)
            toast.success("Usuário Logado com sucesso!")
            navigate("/my-chats")
        }
        catch(err){
            console.error(err)
        }
    }
    return (
        <FormContainer>
            <div className={styles.formBox}>
                <header> 
                    <strong>Faça o seu Login</strong>
                    <div className={styles.infoBox}>
                        <Info weight="bold" size={24}/>
                        <div className={styles.infoTooltip}>
                            <strong>Aviso</strong>
                            <ul>
                               <li>1 - É possível realizar o login utilizando apenas um método</li> 
                               <li>2 - Caso o login seja realizado utilizando Email e Senha, é possível alterar o método para login com Google, mas o contrário não é possível</li>
                            </ul>
                        </div>
                    </div>
                </header>
                <form className={styles.form} action="">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" onChange={(evt) => setEmail(evt.target.value)}/>

                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" onChange={(evt) => setPassword(evt.target.value)}/>

                    <button onClick={signInWithEmail} type="submit">
                        Logar
                    </button>
                </form>

                <span/>
                
                <button onClick={signInWithGoogle} >Continue com Google</button>
            </div>
        </FormContainer>
    )
}