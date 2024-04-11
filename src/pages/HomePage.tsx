import styles from './HomePage.module.css'

import heroImg from '../assets/hero-image.jpg'
import { Link } from 'react-router-dom'

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

                    <Link to="/login">Conecte-se ao futuro</Link>
                </div>
        </div>
    )
}