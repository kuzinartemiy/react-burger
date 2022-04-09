import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TIngredientType } from '../../services/types';
import { dateFormat } from '../../utils/date-format';
import styles from './FeedOrderDetails.module.css';

export const FeedOrderDetails = () => {
  const ingredients = useSelector((store) => store.ingredients);
  const router = useParams<any>();
  const currentOrderId = router.id;
  const currentOrder = useSelector((store) => store.feedOrders?.orders.find((order: any) => order._id === currentOrderId));
  const orderDataIngredients: Array<TIngredientType> = [];

  currentOrder.ingredients.forEach((ingredient: string) => {
    const findedIngredient: TIngredientType | undefined = ingredients.find((el: TIngredientType) => el._id === ingredient);
    findedIngredient && orderDataIngredients.push(findedIngredient);
  });

  const getIngredientCount = (id: string): number => {
    let count = 0;
    orderDataIngredients.forEach((ingredient: TIngredientType) => {
      if (ingredient._id === id) count += 1;
    });
    return count;
  };
  const totalOrderPrice = orderDataIngredients.reduce((acc: number, ingredient: TIngredientType) => acc + ingredient.price, 0);
  const uniqueIngredients = (): Array<TIngredientType> => Array.from(new Set(orderDataIngredients));

  return (
    <div className={styles.feedOrderDetails}>
      <p className="text text_type_digits-default">{`#${currentOrder.number}`}</p>
      <div className="p-5" />
      <p className="text text_type_main-medium">{currentOrder.name}</p>
      <div className="p-2" />
      <p className="text text_type_main-default">{currentOrder.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
      <div className="p-7" />
      <p className="text text_type_main-medium">Состав:</p>
      <div className="p-3" />
      <ul className={styles.feedOrderDetails__ingredientsList}>
        {uniqueIngredients() && uniqueIngredients().map((ingredient: TIngredientType) => (
          <li key={ingredient._id} className={styles.feedOrderDetails__ingredientsItem}>
            <div
              style={{ backgroundImage: `url(${ingredient.image})` }}
              className={styles.feedOrderDetails__ingredientImg}
            />
            <p className="text text_type_main-default">{ingredient.name}</p>
            <div className={styles.feedOrderDetails__ingredientPrice}>
              <p className="text text_type_digits-default">{`${getIngredientCount(ingredient._id)} x ${ingredient.price}`}</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className="p-5" />
      <div className={styles.feedOrderDetails__ingredientPrice}>
        <p className="text text_type_main-default text_color_inactive">{dateFormat(currentOrder.createdAt)}</p>
        <p className={`${styles.feedOrderDetails__orderPrice} text text_type_digits-default`}>
          {totalOrderPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};
