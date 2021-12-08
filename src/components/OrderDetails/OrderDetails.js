import styles from './OrderDetails.module.css';

export const OrderDetails = () => {  //need orderInfo in props
  return (
    <div className={styles.orderDetails__сontent}>
      <p className={`text text_type_digits-large ${styles.orderDetails__orderNumber}`}>034536</p>
      <p className={`text text_type_main-medium ${styles.orderDetails__text}`}>идентификатор заказа</p>
      <div className={styles.orderDetails__doneIcon}/>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

