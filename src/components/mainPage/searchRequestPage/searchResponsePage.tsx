import Form from "./form";
import 'react-calendar/dist/Calendar.css';
import style from '../../../styles/searchPage/index.module.css';
import people from '../../../image/icons/searchPage/indexIcon.svg';
import documenstFolder from '../../../image/icons/searchPage/documenstFolders.svg';
import documents from '../../../image/icons/searchPage/Document.svg';
export default function SearchRequestPage() {

  return (<div className={style.searchBody}>
    <img className={style.documenstFolders} src={documenstFolder} alt="documenstFolder" />
    <img className={style.documents} src={documents} alt="documents" />
    <h2 className={style.tittle}>Найдите необходимые данные в пару кликов.</h2>
    <p className={style.subtittle}>Задайте параметры поиска. </p>
    <p className={style.subtittle}>Чем больше заполните, тем точнее поиск. </p>
    <div className={style.wrapper}>
      <Form/>
      <img className={style.peopleIcon} src={people} alt="icon"  />
    </div>
    </div>
  )
}
