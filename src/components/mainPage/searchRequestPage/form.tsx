import React from 'react'
import Checkbox from '../checkboxBlock/checkbox'
import style from '../../../styles/searchPage/searchPage.module.css'
import { useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import arrow from '../../../image/icons/searchPage/Rectangle.svg'
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

// import { Value } from 'react-calendar/dist/cjs/shared/types';

export default function Form() {


  const [checkedValue, setCheckedValue] = useState([{id: uuidv4(), checked:true},
    {id: uuidv4(), checked:true},
    {id: uuidv4(), checked:true},
    {id: uuidv4(), checked:false},
    {id: uuidv4(), checked:false},
    {id: uuidv4(), checked:true},
    {id: uuidv4(), checked:false},])

  const array = ['Признак максимальной полноты',
  'Упоминания в бизнес-контексте',
  'Главная роль в публикации',
  'Публикации только с риск-факторами',
  'Включать технические новости рынков',
  'Включать анонсы и календари',
  'Включать сводки новостей'];

  const navigate = useNavigate(); /* для того чтобы использовать 
  перенаправление на другую страницу = другими словами: после проверки и всех
  удовлетварительных исходах событий использовать юзнавигейт, например после 
  валидации всей формы и отсутствие пустых полей, использовать этот хук
  */

  const formRequest = (event: React.FormEvent) => {
    console.log(checkedValue)
    event.preventDefault();
    // типизировать локальное хранилище
    const userFromLocalStorage = localStorage.getItem('tokenAndDate');
    const user = JSON.parse(userFromLocalStorage || '{}');
      fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'Bearer '  + user.accessToken,
        },
        body: JSON.stringify({
          "issueDateInterval": {
            "startDate": calendarData.dateStart,
            "endDate":  calendarData.dateEnd
          },
          "searchContext": {
            "targetSearchEntitiesContext": {
              "targetSearchEntities": [
                {
                  
                  "type": "company",
                  "sparkId": null,
                  "entityId": null,
                  "inn": inputValueINN.value,
                  "maxFullness": checkedValue[0].checked,
                  "inBusinessNews": checkedValue[1].checked
                }
              ],
              "onlyMainRole": true,
              "tonality": tonalyti.value,
              "onlyWithRiskFactors": false,
              "riskFactors": {
                "and": [],
                "or": [],
                "not": []
              },
              "themes": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "themesFilter": {
              "and": [],
              "or": [],
              "not": []
            }
          },
          "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
          },
          "attributeFilters": {
            "excludeTechNews": true,
            "excludeAnnouncements": true,
            "excludeDigests": true
          },
          "similarMode": "duplicates",
          "limit": inputValueLimit.value,
          "sortType": "sourceInfluence",
          "sortDirectionType": "desc",
          "intervalType": "month",
          "histogramTypes": [
            "totalDocuments",
            "riskFactors"
          ]
        }
        )
      
      })
      .then ( responce => responce.json());

      
      fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': 'Bearer '  + user.accessToken,
        },
        body: JSON.stringify({
          "issueDateInterval": {
            "startDate": calendarData.dateStart,
            "endDate":  calendarData.dateEnd
          },
          "searchContext": {
            "targetSearchEntitiesContext": {
              "targetSearchEntities": [
                {
                  
                  "type": "company",
                  "sparkId": null,
                  "entityId": null,
                  "inn": inputValueINN.value,
                  "maxFullness": checkedValue[0].checked,
                  "inBusinessNews": checkedValue[1].checked
                }
              ],
              "onlyMainRole": true,
              "tonality": tonalyti.value,
              "onlyWithRiskFactors": false,
              "riskFactors": {
                "and": [],
                "or": [],
                "not": []
              },
              "themes": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "themesFilter": {
              "and": [],
              "or": [],
              "not": []
            }
          },
          "searchArea": {
            "includedSources": [],
            "excludedSources": [],
            "includedSourceGroups": [],
            "excludedSourceGroups": []
          },
          "attributeFilters": {
            "excludeTechNews": true,
            "excludeAnnouncements": true,
            "excludeDigests": true
          },
          "similarMode": "duplicates",
          "limit": inputValueLimit.value,
          "sortType": "sourceInfluence",
          "sortDirectionType": "desc",
          "intervalType": "month",
          "histogramTypes": [
            "totalDocuments",
            "riskFactors"
          ]
        }
        )
      
      })
      .then ( responce => responce.json())
      .then(data => {
        let y = JSON.stringify(data);
        console.log(JSON.parse(y));
        localStorage.setItem('listId', JSON.stringify(data.items))
        return navigate('/requestPage');
      })  
  }

  // тональность
  const arrayTonalyti = [{name:"Любая", value: "any"},
  {name:"Негативная", value: "negative "},
  {name:"Позитивная", value: "positive "}];

  const [tonalyti, setTonalyti] = useState(arrayTonalyti[0]);
  const [drop, setDrop] = useState(false);
  const swapDropState = () => {
    if(drop === true) {
      setDrop(false);
    }
    else {
      setDrop(true);
    }
  }
// ------------------------------------


//  поле с инн -----------------------------------
  const valueToggle = (event: string) => {
    setInputValueINN((inputValueINN) =>  ({...inputValueINN, value: event}))
    validate(event);
  }

  const validate = (text:string) => {
    const regString: RegExp = /^(\d{10}|\d{12})$/;
    const zeroStingRegex:RegExp = /^\s*$/;

    if(regString.test(text) || zeroStingRegex.test(text)) {
      setInputValueINN((inputValueINN) =>  ({...inputValueINN, walidate: true}))
    }
    else {
      setInputValueINN((inputValueINN) =>  ({...inputValueINN, walidate: false}))
    }
  }
  type inputValueINNType =  {value: string, walidate: boolean, textError: string}
  const [inputValueINN, setInputValueINN] = useState<inputValueINNType>({value: '', walidate: true, textError: "Введите корректные данные"})
  // -------------------------------------------------------


  //  поле с проверкой лимита 
  const valueToggleLimit = (event: string) => {
    setInputValueLimit((inputValueINN) =>  ({...inputValueINN, value: event}))
    validateLimit(event);
  }

  const validateLimit = (text:string) => {
    const regString: RegExp = /^([1-9]\d{0,2}|1000)$/;
    const zeroStingRegex:RegExp = /^\s*$/;

    if(regString.test(text) || zeroStingRegex.test(text)) {
      setInputValueLimit((inputValueLimit) =>  ({...inputValueLimit, walidate: true}))
    }
    else {
      setTimeout(() => {
        setInputValueLimit((inputValueLimit) =>  ({...inputValueLimit, walidate: false}))
      }, 1500)
    }
  }
  type inputValueLimitType =  {value: string, walidate: boolean, textError: string}
  const [inputValueLimit, setInputValueLimit] = useState<inputValueLimitType>({value: '', walidate: true, textError: "Обязательное поле"})

  // --------------------------------------

  // календарь ----------------------------------
  // type calendarType = {start: string, dateStart: any, end:any, dateEnd: any}
  const [calendarData, setStateCalendarData] = useState({start: "-.-.-" ,dateStart: new Date(), end:"-.-.-", dateEnd: new Date()});
  const [calendar, setStateCalendar] = useState({state:false,id:''});


  const callingCalendar= (id:string):void => {
    if(id === "start") {
      setStateCalendar({state:true, id:id});
    }
    else {
      setStateCalendar({state:true, id:id});
    }
  } 

  const swapTime = (event:Date) => {
    let year = event.getFullYear();
    let month = 1 + event.getMonth();
    let day = event.getDate();
    let str = `${year}-${month}-${day}`;

   console.log(event);

    if(calendar.id === "start" ) {
      setStateCalendarData((calendarData)=>({...calendarData, start: str}))
      setStateCalendarData((calendarData)=>({...calendarData, dateStart: event}))
      setStateCalendar((calendar)=>({...calendar, state:false}));
    }
    
    else {
      setStateCalendarData((calendarData)=>({...calendarData, end: str}))
      setStateCalendarData((calendarData)=>({...calendarData, dateEnd: event}))
      setStateCalendar((calendar)=>({...calendar, state:false}));
    }
  }
    // ------------------------------------------------

  return (
    <form onSubmit={formRequest}  className = {style.form}>
      <div className={style.wrapper}>

        <div className={style.selectedAndInputs}>
          <p className={style.tittle}>ИНН компании*</p>
          <div className={style.textFieldForDataRequest}>
            <input type="text" 
              className={inputValueINN.walidate !== true ? style.inputFormError : style.inputForm}
              max = {10}
              placeholder = '10 цифр'
              onChange={(event: React.FormEvent<HTMLInputElement>) => valueToggle(event.currentTarget.value)}/>
            <span className={inputValueINN.walidate !== true ? style.errorMessage : style.errorMessageNone}>Введите корректные данные</span>
          </div>

          <p className={style.tittle}>Тональность</p>
          <div className={style.textFieldForDataRequest}>
            <div className={style.dropdown} onClick = {swapDropState}>
              <img src={arrow} alt="#"  className={style.arrow}/>
              <>{tonalyti.name}</>
              <div className={drop !== true ? style.dropItemsNone : style.dropItems}>
                <>
                {arrayTonalyti.map((item, index) => {
                  return <div className={drop === true ? style.dropdownItem : style.dropItemsNone}
                  onClick={()=>{setTonalyti(arrayTonalyti[index])}} key={index}>
                    {item.name}
                  </div>
                })}
                </>
              </div>
            </div>            
          </div>

          <p className={style.tittle}>Количество документов в выдаче*</p>      
          <div className={style.textFieldForDataRequest}>
            <input type="text" min={1} max={1000} placeholder = 'От 1 до 1000'
            className={inputValueLimit.walidate !== true ? style.inputFormError : style.inputForm}
            onChange={(event: React.FormEvent<HTMLInputElement>) => valueToggleLimit(event.currentTarget.value)}/>
            <span className={inputValueLimit.walidate !== true ? style.errorMessage : style.errorMessageNone}>{inputValueLimit.textError}</span>
          </div>

          <p className={style.tittle}>Диапазон поиска*</p>   
          <div className={style.calendar}>
                <div className={style.startTime}
                  onClick={(e)=> {callingCalendar("start")}}
                  >
                      <img src={arrow} alt="#"  className={style.arrow}/>
                     <>{calendarData.start}</>
                </div>
                <div className={style.endTime} 
                  onClick={(e)=> {callingCalendar("end")}}
                  >
                      <img src={arrow} alt="#"  className={style.arrow}/>
                    <>{calendarData.end}</>
                </div>
          </div>

        </div>
        <div className={style.checkedMark}>
          {array.map((textArray, index) => {
              return <Checkbox text = {textArray}
              checked = {checkedValue[index].checked}
              setCheckedValue = { setCheckedValue}
              checkedValue = {checkedValue}
              id = {checkedValue[index].id}
              key={index}/> 
          })}
        </div>
      </div>

      <div className={style.buttonAndMessage}>
        <button disabled={inputValueINN.value.length === 0 || inputValueINN.walidate === false || inputValueLimit.value.length === 0 || inputValueLimit.walidate === false ? true : false}>Поиск</button>
        <p>* Обязательные к заполнению поля</p>
      </div>

      <div id = {calendar.id}className={calendar.state === true ? style.calendarWindow :  style.calendarWindowNone}>
        <Calendar 
        onChange={(event:any) => {swapTime(event)}}
        />
      </div>
    </form>
  )
}
