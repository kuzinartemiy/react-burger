import {
  Logo, BurgerIcon, ListIcon, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
  const onMainPage = useRouteMatch({ path: '/', exact: true });
  const onFeedPage = useRouteMatch({ path: '/feed' });
  const onProfilePage = useRouteMatch({ path: '/profile' });

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navLinks}>
          <li className={styles.header__navListItem}>
            <NavLink exact to="/" className={styles.header__link} activeClassName={styles.header__link_active}>
              <BurgerIcon type={onMainPage ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default text_color_inactive ${styles.header__linkText}`}>Конструктор</p>
            </NavLink>
          </li>
          <li className={styles.header__navListItem}>
            <NavLink to="/" className={styles.header__link}>
              <ListIcon type={onFeedPage ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default header__text text_color_inactive">Лента заказов</p>
            </NavLink>
          </li>
        </ul>

        <Link to="/" className={styles.header__link}><Logo /></Link>

        <NavLink to="/profile" className={styles.header__profileLink} activeClassName={styles.header__profileLink_active}>
          <ProfileIcon type={onProfilePage ? 'primary' : 'secondary'} />
          <p className={`text text_type_main-default text_color_inactive ${styles.header__profileLinkText}`}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};
