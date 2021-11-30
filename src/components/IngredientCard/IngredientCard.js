import styles from './IngredientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientCard = ({ingredient}) => {
  return (
    <div className={styles.ingredientCard}>
      <img className={styles.ingredientCard__image} src={ingredient.image}/>
      <div className={styles.ingredientCard__price}>
        <p className="text text_type_digits-default">60</p><CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  )
}