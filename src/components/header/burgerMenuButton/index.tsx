import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { toggleStateWindow } from '../../../store/windowForBurgerMenu';
import style from './style.module.css';



export default function Index() {
  const dispatch = useDispatch();
  let stateWindowRedux = useSelector((state: RootState) => state.burgerMenuWindow.value); 
  const [stateLogo, setStateLogo] = useState(stateWindowRedux);

  useEffect(()=> {
    setStateLogo(stateLogo);
  }, [stateWindowRedux]);
 
  useEffect(()=> {
    if (stateWindowRedux === false) {
      setBurgerLineOne((burgerLineOne) => burgerLineOne = `${style.line} ${style.lineOneBack}`)
      setBurgerLineTwo((burgerLineTwo) => burgerLineTwo = `${style.lineTwoBack}`)
      setBurgerLineThree((burgerLineThree) => burgerLineThree = `${style.line} ${style.lineThreeBack}`)
    }
  }, [stateWindowRedux]);

  


  

  const [burgerLineOne, setBurgerLineOne] = useState<string>(`${style.line}`);
  const [burgerLineTwo, setBurgerLineTwo] = useState<string>(`${style.line}`);
  const [burgerLineThree, setBurgerLineThree] = useState<string>(`${style.line}`);

//   состояние бургер меню (закрытое или открытое)
  const toggleClassName = ():void => {
    if(stateWindowRedux === false || stateWindowRedux === undefined) {
        dispatch(toggleStateWindow(true));
        setBurgerLineOne((burgerLineOne) => burgerLineOne = `${style.line} ${style.lineOne}`)
        setBurgerLineTwo((burgerLineTwo) => burgerLineTwo = `${style.line} ${style.lineTwo}`)
        setBurgerLineThree((burgerLineThree) => burgerLineThree = `${style.line} ${style.lineThree}`)
    }

    else {
        dispatch(toggleStateWindow(false));
        setBurgerLineOne((burgerLineOne) => burgerLineOne = `${style.line} ${style.lineOneBack}`)
        setBurgerLineTwo((burgerLineTwo) => burgerLineTwo = `${style.lineTwoBack}`)
        setBurgerLineThree((burgerLineThree) => burgerLineThree = `${style.line} ${style.lineThreeBack}`)
    }
}


  return (
    <>
     <div className={style.burgerMenu} onClick={toggleClassName}>
        <div className={burgerLineOne}> </div>
        <div className={burgerLineTwo}> </div>
        <div className={burgerLineThree}> </div>  
     </div>
    </>
  )
}
