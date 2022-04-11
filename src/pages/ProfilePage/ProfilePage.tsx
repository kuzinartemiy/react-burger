import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { EditProfileForm } from '../../components/EditProfileForm/EditProfileForm';
import { OrdersList } from '../../components/OrdersList/OrdersList';
import { ProfileNavbar } from '../../components/ProfileNavbar/ProfileNavbar';
import { wsClose, wsCustomUrlConnectionStart } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feedOrders?.orders);

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
    dispatch(wsCustomUrlConnectionStart(`wss://norma.nomoreparties.space/orders?token=${token}`));
    return () => {
      dispatch(wsClose());
    };
  }, []);

  return (
    <div className={styles.profilePage}>
      <ProfileNavbar />
      <Route exact path="/profile" component={EditProfileForm} />
      <Route exact path="/profile/orders">
        {orders?.length ? <OrdersList placeShow="profile" /> : <h2 className="text text_type_main-large">No orders today.</h2>}
      </Route>
    </div>
  );
};
