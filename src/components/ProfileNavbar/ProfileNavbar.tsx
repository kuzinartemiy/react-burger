import { SyntheticEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../services/actions/user';
import { useDispatch } from '../../services/hooks';
import styles from './ProfileNavbar.module.css';

export const ProfileNavbar = () => {
  const dispatch = useDispatch();
  const logoutHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={styles.profileNavbar__nav}>
      <ul className={styles.profileNavbar__links}>
        <li>
          <NavLink
            activeClassName={styles.profileNavbar__link_active}
            className={`text text_type_main-medium text_color_inactive ${styles.profileNavbar__link}`}
            to="/profile"
            exact
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.profileNavbar__link_active}
            className={`text text_type_main-medium text_color_inactive ${styles.profileNavbar__link}`}
            to="/profile/orders"
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <button
            type="button"
            onClick={logoutHandler}
            className={`text text_type_main-medium text_color_inactive ${styles.profileNavbar__logoutButton}`}
          >
            Выход
          </button>
        </li>
      </ul>
      <div className="p-10" />
      <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  );
};
