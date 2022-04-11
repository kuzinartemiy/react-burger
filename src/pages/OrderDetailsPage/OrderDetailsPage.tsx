import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { wsClose, wsConnectionStart, wsCustomUrlConnectionStart } from '../../services/actions/wsActions';
import { useDispatch } from '../../services/hooks';
import { FeedOrderDetails } from '../../components/FeedOrderDetails/FeedOrderDetails';
import styles from './OrderDetailsPage.module.css';

export const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/profile')) {
      const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
      dispatch(wsCustomUrlConnectionStart(`wss://norma.nomoreparties.space/orders?token=${token}`));
    } else {
      dispatch(wsConnectionStart());
    }
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  return (
    <div className={styles.orderDetailsPage}>
      <FeedOrderDetails />
    </div>
  );
};
