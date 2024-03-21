import { FormContainer } from "../components/FormContainer";

import styles from './Register&LoginPages.module.css'

export function RegisterPage(){
    return (
        <FormContainer>
            <div className={styles.formBox}>
                <strong> Crie uma conta </strong>
                <form className={styles.form} action="">
                    <label htmlFor="email">Email</label>
                    <input type="text" />

                    <label htmlFor="password">Senha</label>
                    <input type="password" />

                    <label htmlFor="password-confirmation">Repita sua senha</label>
                    <input type="password" />

                    <button type="submit">
                        Criar conta
                    </button>
                </form>
            </div>
        </FormContainer>
    )
}