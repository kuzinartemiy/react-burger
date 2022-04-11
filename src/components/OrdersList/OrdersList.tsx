import { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { TOrderType } from '../../services/types';
import { OrderCard } from '../OrderCard/OrderCard';
import styles from './OrdersList.module.css';
import { IOrdersListProps } from './OrdersList.props';

export const OrdersList: FC<IOrdersListProps> = ({ placeShow }) => {
  const orders = useSelector((store) => store.feedOrders?.orders);
  const ordersToRender = placeShow === 'profile' ? [...orders].reverse() : orders;

  return (
    <ul className={styles.ordersList}>
      {ordersToRender && ordersToRender.map((order: TOrderType) => (
        <li key={order._id}>
          <OrderCard showStatus orderData={order} />
        </li>
      ))}
    </ul>
  );
};
