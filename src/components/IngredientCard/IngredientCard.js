import styles from './IngredientCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';

export const IngredientCard = ({ingredient, openModal}) => {
  return (
    <li onClick={() => openModal(ingredient)} className={styles.ingredientCard}>
      <img className={styles.ingredientCard__image} src={ingredient.image} alt={ingredient.image}/>
      <div className={styles.ingredientCard__price}>
        <p className="text text_type_digits-default">{ingredient.price}</p><CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </li>
  )
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape(IngredientType).isRequired,
  openModal: PropTypes.func.isRequired,
}
