import IconPeople from './iconPeople'
import styles from '../../../styles/mainPage/index.module.css';
import { Link } from 'react-router-dom';
export default function SectionRequest() {

  const localstorageToken = localStorage.getItem('tokenAndDate')

  const autoWalidate = ():string => {
    return localstorageToken ? '/responsePage' : '/login'
  }

  return (
    <div className={styles.sectionRequest}>
      <div className={styles.text}>
        <span>сервис по поиску публикаций о компании по его ИНН</span>
        <span>Комплексный анализ публикаций, получение данных 
          в формате PDF на электронную почту.</span>
          
      <Link to={autoWalidate()} className={styles.button}>Запросить данные</Link> 
      </div>
      <IconPeople/>
    </div>
  )
}
