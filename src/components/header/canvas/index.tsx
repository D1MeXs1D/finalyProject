import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import LinksMenu from '../burgerMenuLink/index';


export default function Index() {
  let stateWindow = useSelector((state: RootState) => state.burgerMenuWindow.value); 

  const styleWindow = () => {
    switch (stateWindow) {
      case undefined:
        return style.bodyMenuNone; 

      case true:
        return style.bodyMenu;

      case false:
        return style.bodyMenuShiftBack;

      default:
        return style.bodyMenuNone;
    }
  }
  
  return (
    <div className={styleWindow()}>
      <div className={style.wrapper}>
       <LinksMenu/>
      </div>
    </div>
  )
}
