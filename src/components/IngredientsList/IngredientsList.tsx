import styles from './IngredientsList.module.css';
import { IngredientCard } from "../IngredientCard/IngredientCard"
import { forwardRef } from 'react';
import { IIngredientListProps } from './IngredientsList.props';

export const IngredientsList = forwardRef<HTMLDivElement, IIngredientListProps>(({ title, ingredients }, ref): JSX.Element => {
  const ingredientId = ingredients[0].type + 's';

  return (
    <div ref={ref} id={ingredientId} className={styles.ingredientsList__container}>

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
})