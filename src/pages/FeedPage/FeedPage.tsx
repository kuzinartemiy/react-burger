import { useEffect, useMemo } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { OrdersList } from '../../components/OrdersList/OrdersList';
import { wsClose, wsConnectionStart } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks';
import { TOrderType } from '../../services/types';
import styles from './FeedPage.module.css';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feedOrders?.orders);
  const isLoading = useSelector((store) => store.isLoading);
  const totalOrders = useSelector((store) => store.feedOrders?.total);
  const todayOrders = useSelector((store) => store.feedOrders?.totalToday);

  const doneOrders = useMemo(() => orders && orders.filter((order: any) => order.status === 'done'), [orders]);
  const pendingOrders = useMemo(() => orders && orders.filter((order: any) => order.status === 'pending'), [orders]);

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsClose());
    };
  }, []);

  return (
    <div className={styles.feedPage}>
      {isLoading ? <Loader /> : (
        <>
          <h1 className="text text_type_main-large">Лента заказов</h1>
          <div className={styles.feedPage__container}>
            <OrdersList />
            <div className={styles.feedPage__ordersInfo}>
              <div className={styles.feedPage__ordersStatus}>
                <div>
                  <p className="text text_type_main-medium mb-6">Готовы:</p>
                  <ul className={styles.feedPage__ordersStatusList}>
                    {doneOrders && doneOrders.slice(0, 10).map((order: TOrderType) => (
                      <li key={order._id}>
                        <p className={`text text_type_digits-default ${styles.feedPage__orderNumber_done}`}>{order.number}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text text_type_main-medium mb-6">В работе:</p>
                  <ul className={styles.feedPage__ordersStatusList}>
                    {pendingOrders && pendingOrders.map((order: TOrderType) => (
                      <li key={order._id}>
                        <p className="text text_type_digits-default">{order.number}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.feedPage__ordersTotal}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large">{totalOrders}</p>
              </div>
              <div className={styles.feedPage__ordersToday}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{todayOrders}</p>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
};
