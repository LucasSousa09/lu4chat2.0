import { ReactNode } from "react"

import styles from './FormContainer.module.css'

type FormContainerProps = {
    children: ReactNode
}

export function FormContainer( {children}: FormContainerProps ){
    return (
        <div className={styles.formContainer}>
            {children}
        </div>
    )
}