import styles from './IngredientsList.module.css';
import { IngredientCard } from "../IngredientCard/IngredientCard"
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';

export const IngredientsList = ({title, ingredients, openModal}) => {
  return (
    <div className={styles.ingredientsList__container}>

      <p className="text text_type_main-medium">{title}</p>

      <ul className={styles.ingredientsList__ingredients}>
        {ingredients.map(ingredient => {
          return (
            <IngredientCard openModal={openModal} key={ingredient._id} ingredient={ingredient}/>
          )
        })}
      </ul>
    </div>
  )
}

IngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType).isRequired).isRequired,
  openModal: PropTypes.func.isRequired,
};