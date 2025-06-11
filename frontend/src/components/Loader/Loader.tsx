import RacingCarIcon from './assets/racing-car.svg?react';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.root}>
    <div className={styles.road}>
      <div className={styles.car}>
        <RacingCarIcon className={styles.icon} />
      </div>
      <div className={styles.finish}></div>
    </div>
  </div>
);

export { Loader };
