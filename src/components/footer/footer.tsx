import React from 'react';
import styles from '../../styles/footer/footer.module.css';
import Contacts from './contacts';

import Copyright from './Copyright';
import LogoWhite from './logoWhite';



export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
          <LogoWhite/>

          <div className={styles.feedback}>
             <Contacts/>
             <Copyright/>
          </div>
   
      </div>
    </div>
  )
}
