import styles from './IngredientsList.module.css';
import { IngredientCard } from "../IngredientCard/IngredientCard"
import PropTypes from 'prop-types';

export const IngredientsList = ({title, ingredients}) => {
  return (
    <div className={styles.ingredientsList__container}>

      <p className="text text_type_main-medium">{title}</p>

      <ul className={styles.ingredientsList__ingredients}>
        {ingredients.map(ingredient => {
          return (
            <IngredientCard key={ingredient._id} ingredient={ingredient}/>
          )
        })}
      </ul>
    </div>
  )
}

IngredientsList.propTypes = {
  title: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.object),
};