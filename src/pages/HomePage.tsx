import styles from './HomePage.module.css'

import heroImg from '../assets/hero-image.jpg'

export function HomePage(){
    return (
        <div className={styles.homepageContainer}>
                <img src={heroImg} alt="" />
                <div>
                    <span>Lu4chat</span>
                    <span className={styles.highlighted}>O novo aplicativo</span>
                    <span>de conversas</span>
                    <span className={styles.highlighted + " " + styles.inline}>on-line</span>
                    <span className={styles.inline}>para você</span>

                    <a href="/login">Conecte-se ao futuro</a>
                </div>
        </div>
    )
}