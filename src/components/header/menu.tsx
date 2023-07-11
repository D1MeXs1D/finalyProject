import {Link} from "react-router-dom";
import styles from '../../styles/header/header.module.css'
export default function Menu() {
  return (
    <>
    <ul className={styles.parterLinks}>
        <li><Link to='/' className={styles.link}>Главная</Link></li>
        <li>Тарифы</li>
        <li>FAQ</li>
    </ul>
    </>
  )
}
