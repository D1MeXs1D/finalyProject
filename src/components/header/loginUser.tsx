import React from 'react'
import styles from "../../styles/header/header.module.css"
import { Link } from 'react-router-dom'
export default function LoginUser() {
  return (
    <div className={styles.loginAndRegister}>
      <span className={styles.register}>Зарегистрироваться</span>
      <div className={styles.line}></div>
      <Link to='/login' className={styles.login}>Войти</Link>
    </div>
  )
}
