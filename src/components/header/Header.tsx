import styles from "../../styles/header/header.module.css";
import LoginUser from "./loginUser";
import Logo from './logo';
import Menu from './menu';
import MobileMenuButton from './burgerMenuButton/index';
import MenuBoard from './canvas/index';
import Limit from './limitCompany/index'
export default function Header() {


  return (
    <div className={styles.header}>
        <div className={styles.wrapper}>
            <Logo/>
            <Menu/>
            {/* <Limit/> */}
            <LoginUser/>
            <MobileMenuButton/>
            
        </div>
            
            <MenuBoard/>
    </div>
  )
}
