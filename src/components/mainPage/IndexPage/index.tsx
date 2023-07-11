import styles from '../../../styles/mainPage/index.module.css';

import PricingPlans from './pricingPlans';
import SectionBlobs from './sectionBlobs';
import SectionRequest from './sectionRequest';
import SectionSlider from './sectionSlider';

export default function Index() {
  return (
    <div className={styles.wrapper}>
    <SectionRequest/>
    <SectionSlider/>
    <SectionBlobs/>
    <PricingPlans/>
    </div>
  )
}
