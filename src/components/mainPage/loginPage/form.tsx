import React from 'react';
import style from '../../../styles/loginPage/loginPageStyle.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { loginState,  passwordState, registredState} from '../../../store/sliceAuthorization';

import { useState } from 'react';
import { useNavigate } from 'react-router';

// иконки
import castle from '../../../image/icons/forLoginPage/castle.svg';
import iconGoogle from '../../../image/icons/forLoginPage/google.svg';
import iconFacebook from '../../../image/icons/forLoginPage/facebook.svg';
import iconYandex from '../../../image/icons/forLoginPage/yandex.svg';



export default function ModalWindow() {
  const dispatch = useDispatch();

  type arrayInputTypes = {
    tittle:string, 
    placeholder: string,
    type: string, 
    func: (e: React.FormEvent<HTMLInputElement>) => void,
    state?: boolean,
    messageError?: string,
  };

  const [inputLogin, setInputLogin ] = useState<boolean>(true);
  const [inputPassword, setInputPassword ] = useState<boolean>(true);

  // сравнение строк для валидации

  const validate = (e: string): void => {
    const phoneNumberRegex:RegExp = /^\+[0-9]{2}-[0-9]{3}-[0-9]{7}$/;
    const loginRegex:RegExp = /^[^\u0400-\u04FF]+$/u;
    const zeroStingRegex:RegExp = /^\s*$/;

    if(loginRegex.test(e) || phoneNumberRegex.test(e)  || zeroStingRegex.test(e)) {
      setInputLogin(true);
    }
    else {
      setInputLogin(false);
    }
  }

  const arrayInputs: arrayInputTypes [] = [
    {tittle: 'Логин или номер телефона:',
    type: 'text',
    placeholder: 'Введите телефон или логин',
    func: (e:React.FormEvent<HTMLInputElement>) => {
      dispatch(loginState(e.currentTarget.value));
      validate(e.currentTarget.value);
    },
    state: inputLogin,
    messageError: 'Введите корректные данные'
    },
    {tittle: 'Пароль:',
    type: 'password',
    placeholder: 'Введите пароль',
    func: (e:React.FormEvent<HTMLInputElement>) => {
      dispatch(passwordState(e.currentTarget.value));
      setInputPassword(true);
    },
    state: inputPassword,
    messageError: 'Неправильный пароль'
    }];

  const arrayImage= [iconGoogle, iconFacebook, iconYandex]; //  image
  

  let userAutorization = useSelector((state: RootState) => state.request);


  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();  
     
    let userRequest = {
          login:  userAutorization.login,
          password: userAutorization.password
        };

     fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(userRequest)
      })
      .then ( responce => responce.json())
      .then(data => {
        if(!data.hasOwnProperty('accessToken')) {
          console.log(data.hasOwnProperty('accessToken'));
          setInputPassword(false);
        }
        else {
          console.log(data.hasOwnProperty('accessToken'));
          localStorage.setItem('tokenAndDate', JSON.stringify(data));

        }
      })
      dispatch(registredState(true));
      navigate('/');
  }

  const disabledButon = () =>  {
   if ( userAutorization.login === '' || userAutorization.password === "") {
    return true;
    
   }
   else {
    return false;
   }
  }

  return (
    <form className={style.modalWindow}  onSubmit={handleSubmit}>
      <img className={style.imageCastle} src={castle} alt="castle"/>
      <div className={style.window}>
        <div className={style.option}>
          <span>Войти</span>
          <span>Зарегистрироваться</span>
        </div>
        <>
          {arrayInputs.map((item, index) => {
            return (
              <div className={style.textForLogin} key={index}>
                <span className={style.span}>{item.tittle}</span>
                <input  onChange={(e: React.FormEvent<HTMLInputElement>) => item.func(e)}  
                  type={item.type}
                  className={item.state ? style.input : style.inputError}
                  placeholder={item.placeholder}
                  />
                  <span className={item.state ? style.errorMessageNone : style.errorMessageActive}>{item.messageError}</span>
              </div>
            )
          })}
          <button  disabled = {disabledButon()} className={disabledButon() ? style.buttonOneDisabled : style.buttonOne}>Войти</button>
          <button className={style.buttonTwo}>Восстановить пароль</button>

          <div className={style.bottomButtons}>
            <span className={style.tittleForButtons}>Войти через:</span>
            <div className={style.buttons}>

              {arrayImage.map((item, index) => {
                return (<div className={style.buttonSocialNetwork} key={index}>
                  <img src={item} alt='#' />
                </div>)

              })}
            </div>
          </div>
        </>
      </div>
    </form>
  )
}
