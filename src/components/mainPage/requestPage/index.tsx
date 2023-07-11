import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import styles from './style.module.css';
import standartImageForNews  from "../../../image/starndartImageForNews/news.jpg"


export default function Documents() {
  const idCardForNews = JSON.parse(localStorage.getItem('listId') || '{}');  // тут я беру айдишники
  let maxRequest:number = 10; // тут количество новостей в 1 подмассиве




  let ListCards: any[] = []; //массив в который будет выведен результат.
  for (let i = 0; i < Math.ceil(idCardForNews.length/maxRequest); i++){
    ListCards[i] = idCardForNews.slice((i*maxRequest), (i*maxRequest) + maxRequest);
  }

  console.log(ListCards)
 
  const [cards, cardsState] = useState<any>(arrayPattern());    // это состояние которое будет парситься
  let copyArrayForState = Object.assign([], cards);
  
  const userFromLocalStorage = localStorage.getItem('tokenAndDate'); // тут токен
  const user = JSON.parse(userFromLocalStorage || '{}'); 
 


 function getResponse(number: number) {

      ListCards[number].map((item:any): void => { 
      fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer '  + user.accessToken,
        },
      body: JSON.stringify({
        "ids": [item.encodedId]
      })
    }).then (res => res.json())
    .then(data => {
      if(copyArrayForState[number].length == 0 || copyArrayForState[number].length < 10) {
        copyArrayForState[number].push(data[0])
        cardsState(() => [...copyArrayForState]);
      }
      })
    });
  }
  
  const [startIndex, setStartIndex] = useState(0)
  useEffect(() => {
    getResponse(startIndex);
  }, []);


  function arrayPattern ():any {
    let arrayList:any = [];
    for(let i = 0; i < ListCards.length; i++ ) {
    arrayList = [...arrayList, []]
  }
    return arrayList;
  }

  function cleanText(text:string) {
    // Оставляем только буквы русского алфавита, пробелы и знаки препинания
    var cleanedText = text.replace(/[^а-яА-ЯёЁ0-9\s.,!?]/g, ''); 
    
    // Удаление лишних пробелов и дефисов
    cleanedText = cleanedText.replace(/\s{2,}/g, ' ').replace(/-{2,}/g, '-');

     // Ограничиваем количество предложений возвращаемым результатом
    let sentences = cleanedText.replace(/([.!?])\s*/g, "$1|").split("|").slice(0, 2); 
   
    // Возвращаем очищенный текст
    return sentences;
  }

  function parseCards (indexOne:any,indexTWO:any ) {
    const xml = cards[indexOne][indexTWO]?.ok.content.markup;


   
    
    // Возвращаем массив всех найденных ссылок
    let matches = xml.match(/src\s*=\s*['"](.*?)['"]/gi);
    
    let newArray = matches?.map((element:any )=> element.slice(5, element.length-1)).filter((element:string )=> element !== "");

    const clearString = cleanText(DOMPurify.sanitize(xml));
    // шаблонная строка которая хранит в себе дату в формате день.месяц.год
    const date = `${new Date(cards[indexOne][indexTWO]?.ok.issueDate).getDate()}.${1+ +new Date(cards[indexOne][indexTWO]?.ok.issueDate).getMonth()}.${new Date(cards[indexOne][indexTWO]?.ok.issueDate).getFullYear()}`;

    return (
    <div className={styles.cardNews}>
      <div className={styles.wrapper}>
      <div className={styles.DataAndAutor}>
         <div className={styles.data}>{date}</div> <div className={styles.autor}>{cards[indexOne][indexTWO]?.ok.source.name}</div>
      </div>  
      <h2 className={styles.title}>{cards[indexOne][indexTWO]?.ok.title.text}</h2>
      <div className={styles.image}>
        {newArray !== undefined ? <img  src={newArray[0]}/> : <img  src={standartImageForNews}/> }
      </div>
      <div className={styles.textNews}>{clearString}</div>
      <div className={styles.bottom}>
        <a className={styles.link} target='_blank' href={cards[indexOne][indexTWO]?.ok.url}>Читать в источнике</a>
      </div>
      </div>
    </div>)
  }

 
  function showNews () {
    if(startIndex < cards.length) {
      setStartIndex(startIndex + 1);
      getResponse(startIndex);
    }
  }

  return (
    <>
    <div className={styles.news} >
     <>{cards.map((item:any, indexLine:any) => {
          // console.log()
     return  item.map((i:any, indexColumn:any) => { 
      console.log(i)
        return  parseCards (indexLine, indexColumn )
         })
     })}</>
    </div>
       { startIndex < cards.length 
        && <button className={styles.button} onClick={showNews}>click</button>}
    </>
  )
}
