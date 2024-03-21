import { FormContainer } from "../components/FormContainer";

import styles from './Register&LoginPages.module.css'

export function LoginPage(){
    return (
        <FormContainer>
            <div className={styles.formBox}>
                <strong> Faça seu login </strong>
                <form className={styles.form} action="">
                    <label htmlFor="email">Email</label>
                    <input type="text" />

                    <label htmlFor="password">Senha</label>
                    <input type="password" />

                    <button type="submit">
                        Logar
                    </button>
                </form>
            </div>
        </FormContainer>
    )
}