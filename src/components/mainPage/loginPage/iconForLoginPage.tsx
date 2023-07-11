import icon from '../../../image/icons/forLoginPage/forLoginPage.svg'
import style from '../../../styles/loginPage/loginPageStyle.module.css'
export default function IconForLoginPage() {
  return (
    <>
      <img className={style.image} src={icon} alt="icon"/>
      <img className={style.imageMobile} src={icon} alt="icon"/>
    </>
  )
}
