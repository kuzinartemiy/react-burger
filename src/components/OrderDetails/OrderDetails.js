import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

export const OrderDetails = ({ orderId }) => {
  return (
    <div className={styles.orderDetails__сontent}>
      <p className={`text text_type_digits-large ${styles.orderDetails__orderNumber}`}>{orderId}</p>
      <p className={`text text_type_main-medium ${styles.orderDetails__text}`}>идентификатор заказа</p>
      <div className={styles.orderDetails__doneIcon}/>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
}