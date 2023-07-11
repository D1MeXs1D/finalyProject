import React from 'react'
import IconForLoginPage from './iconForLoginPage';
import style from '../../../styles/loginPage/loginPageStyle.module.css'
import TextLoginPage from './textLoginPage';
import ModalWindow from './form';

export default function LoginPage() {

  return (
    <div>
      <div className={style.wrapper}>
        <div className={style.tittleFromLogin}>
          <TextLoginPage/>
          <IconForLoginPage/>
        </div>
        <ModalWindow/>
        <IconForLoginPage/>        
      </div>
    </div>
  )
}
