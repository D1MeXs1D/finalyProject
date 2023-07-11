import style from './style.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { valueUsedState, limitCompanyState } from '../../../store/headerLimitSlice';
import { RootState } from '../../../store/store';
import { useEffect, useState } from 'react';

export default function Index() {
  const dispatch = useDispatch();




let limitStateShowOrHidden = useSelector((state: RootState) => state.request);
let usedCompany = useSelector((state: RootState) => state.limitCompany);

  const userFromLocalStorage = localStorage.getItem('tokenAndDate'); // тут токен
  const user = JSON.parse(userFromLocalStorage || '{}'); 

  function requestLimitUser () {
    fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer '  + user.accessToken,
        },
  }).then(response => response.json())
  .then(data => {
    console.log(data)
    dispatch(valueUsedState(data?.eventFiltersInfo.usedCompanyCount))
    dispatch(limitCompanyState(data?.eventFiltersInfo.companyLimit))
  })
}

useEffect(()=> {
  console.log('0000000000')
}, [limitStateShowOrHidden])


  return (
    <>
    {limitStateShowOrHidden.login.length !== 0 && <div className={style.wrapper}>
        <div className={style.childLineWrapper}><span className={style.text}>Использовано компаний:</span>
            <span className={style.usedCompany}>{usedCompany.valueUsed}</span>
        </div>

        <div className={style.childLineWrapper}><span className={style.text}>Лимит по компаниям:</span>
            <span className={style.LimitCompany}>{usedCompany.limitCompany}</span>
        </div>
    </div>
  }
    </>
  )
}
