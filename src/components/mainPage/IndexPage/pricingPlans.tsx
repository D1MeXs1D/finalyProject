import styles, { card } from '../../../styles/mainPage/index.module.css';
import lamp from '../../../image/icons/mainPage/lamp.svg';
import darts from '../../../image/icons/mainPage/darts.svg';
import laptop from '../../../image/icons/mainPage/laptop.svg';

export default function PricingPlans() {

  type card = {
    tittles: string,
    smallTittle: string,
    image: 'typeof module',
    price: {
      priceYes: string,
      priceNo: string
    },
    credit?:string,
    rate: string []
  }
  
  const cards: card [] = [
    {tittles:'Beginner',
    smallTittle: 'Для небольшого исследования',
    image: lamp,
    price: {
      priceYes: '799 ₽',
      priceNo: '1 200 ₽'
    },
    credit: 'или 150 ₽/мес. при рассрочке на 24 мес.',
    rate: ['Безлимитная история запросов','Безопасная сделка','Поддержка 24/7']
    },
    {tittles:'Pro',
    smallTittle: 'Для HR и фрилансеров',
    image: darts,
    price: {
      priceYes: '1 299 ₽',
      priceNo: '2 600 ₽'
    },
    credit: 'или 279 ₽/мес. при рассрочке на 24 мес.',
    rate: ['Все пункты тарифа Beginner','Экспорт истории','Рекомендации по приоритетам']
    },
    {tittles:'Business',
    smallTittle: 'Для корпоративных клиентов',
    image: laptop,
    price: {
      priceYes: '2 379 ₽',
      priceNo: '3 700 ₽'
    },
    credit: '',
    rate: ['Все пункты тарифа Pro','Безлимитное количество запросов','Приоритетная поддержка']
    },
  ]

  return (
    <div className={styles.PricePlans}>
      <h1>Наши тарифы</h1>
      <div className={styles.cardsRate}>
      <>
      {cards.map((item, index) => {
        return (
          <div className={styles.cardRate} key={index}>
            <div className={styles.headCard}>
              <div className={styles.wrapHeadCards}>
              <div className={styles.textTittle}>
                <span>{item.tittles}</span>
                <span>{item.smallTittle}</span>
              </div>
              <img src={item.image} alt="#" />
              </div>
            </div>
            <div className={styles.price}>
              <div className={styles.sell}>
                <span>{item.price.priceYes}</span>
                <span>{item.price.priceNo}</span>
              </div>
              <span>{item.credit}</span>
              <div className={styles.list}>
                <h2>В тариф входит:</h2>
                <ul>
                  <>
                  {item.rate.map((elemList, index) => {
                    return (<li key={index}>{elemList}</li>)
                  })}
                  </>
                </ul>
              </div>
            </div>
            <button>Подробнее</button>
          </div>
        )
      })}
      </>
      </div>
    </div>
    
  )
}
