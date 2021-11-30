import styles from './IngredientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const IngredientCard = ({ingredient}) => {
  return (
    <li className={styles.ingredientCard}>
      <img className={styles.ingredientCard__image} src={ingredient.image} alt={ingredient.image}/>
      <div className={styles.ingredientCard__price}>
        <p className="text text_type_digits-default">{ingredient.price}</p><CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </li>
  )
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
  })
}