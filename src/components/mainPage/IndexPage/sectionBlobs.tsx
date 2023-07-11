import styles from '../../../styles/mainPage/blobs/styleForBlobs.module.css';
import blob from '../../../image/icons/mainPage/blobs.svg'

export default function SectionBlobs() {
  return (
    <div className={styles.wrapper}>
      <img src={blob} alt="#" />
    </div>
  )
}
