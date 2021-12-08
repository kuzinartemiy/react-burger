import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>

        <ul className={styles.header__navLinks}>
          <li className={styles.header__navListItem}>
            <a href="#" className={styles.header__link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </a>
          </li>
          <li className={styles.header__navListItem}>
            <a href="#" className={styles.header__link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default header__text text_color_inactive">Лента заказов</p>
            </a>
          </li>
        </ul>

        <a href="#" className={styles.header__link}><Logo /></a>
        
        <a href="#" className={styles.header__profileLink}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
        </a>
      </nav>
    </header>

  )
}