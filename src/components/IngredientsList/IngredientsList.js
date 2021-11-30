import styles from './IngredientsList.module.css';
import { IngredientCard } from "../IngredientCard/IngredientCard"


export const IngredientsList = ({title, ingredients}) => {
  return (
    <div className={styles.ingredientsList__container}>

      <p className="text text_type_main-medium">{title}</p>
      
      <ul className={styles.ingredientsList__ingredients}>
        {ingredients.map(ingredient => {
          return (
            <li className={styles.ingredientsList__ingredient}>
              <IngredientCard ingredient={ingredient}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}