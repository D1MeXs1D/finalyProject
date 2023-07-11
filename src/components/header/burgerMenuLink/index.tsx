import { Link } from 'react-router-dom';
import style from './styleLinks.module.css';
import logo from '../../../image/logoWhite.svg'
import { useSelector, useDispatch} from 'react-redux';
import { toggleStateWindow } from '../../../store/windowForBurgerMenu';
import { RootState } from '../../../store/store';
import { useEffect, useState } from 'react';

export default function Index() {
  let stateLogoredux = useSelector((state: RootState) => state.burgerMenuWindow.value); 
  const [stateLogo, setStateLogo] = useState(stateLogoredux);

useEffect(() => {
console.log(stateLogo);

}, [stateLogo])

useEffect(() => {
  setStateLogo(stateLogoredux)

}, [stateLogoredux])


  const dispatch = useDispatch();  


  const closeWindow = (): void => {
    stateLogo === true && dispatch(toggleStateWindow(false));
  }
    
  return (
    <>
        <Link to='/' onClick={() => closeWindow()}  className={stateLogo === true ? style.logo : style.logoHidden}><img src={logo} alt="logo"/></Link>

         <ul className={stateLogo === true ? style.parterLinks  : style.parterLinksHidden}>
            <li><Link to='/' onClick={() => closeWindow()} className={style.link}>Главная</Link></li>
            <li>Тарифы</li>
            <li>FAQ</li>
         </ul>
    </>
  )
}
