import styles from './Loader.module.css';

export const Loader = (): JSX.Element => {
  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}