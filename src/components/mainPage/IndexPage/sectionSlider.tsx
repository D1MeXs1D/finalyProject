import styles from '../../../styles/mainPage/index.module.css';
import watch from '../../../image/icons/mainPage/watch.svg';
import magnifyingGlass from '../../../image/icons/mainPage/magnifyingGlass.svg';
import shield from '../../../image/icons/mainPage/shield.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
export default function SectionSlider() {


  type objectForSlider = {
    image: 'typeof module',
    text: string
  }

  const arrayImagesAndTextForSlider: objectForSlider [] = [
    {image: watch, text: 'Высокая и оперативная скорость обработки заявки'},
    {image: magnifyingGlass, text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'},
    {image: shield, text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'},
    {image: watch, text: 'Высокая и оперативная скорость обработки заявки'},
    {image: magnifyingGlass, text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'},
    {image: shield, text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'},
];


  return (
    <>
      <h1>Почему именно мы</h1>

      <div className={styles.slider}>
   
      <div className={styles.slides}>
        <div className={styles.cards}>
        {arrayImagesAndTextForSlider.map((item, index) => {
          return (
            <div className={styles.card} key={index}>
              <img  src={item.image} alt="#" />
              <span>{item.text}</span>
            </div>
          )
        })}</div>
      </div>

      </div>
    </>
  )
}