import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TIngredientType } from '../../services/types';
import { Loader } from '../Loader/Loader';
import styles from './IngredientDetails.module.css';

export const IngredientDetails = () => {
  const router = useParams<any>();
  const ingredients = useSelector((store) => store.ingredients);

  const ingredientId = router.id;
  const ingredient: TIngredientType | undefined = ingredients.find((el) => el._id === ingredientId);

  return (
    <div>
      {!ingredient
        ? <Loader />
        : (
          <>
            <p className={`text text_type_main-large ${styles.ingredientDetails__title}`}>Детали ингредиента</p>
            <div className={styles.ingredientDetails__content}>
              <img className={styles.ingredientDetails__image} alt={ingredient.name} src={ingredient.image} />
              <p className="text text_type_main-medium">{ingredient.name}</p>
              <ul className={styles.ingredientDetails__statsList}>
                <li className={styles.ingredientDetails__statsListItem}>
                  <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                  <p className="text text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                </li>
                <li className={styles.ingredientDetails__statsListItem}>
                  <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                  <p className="text text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                </li>
                <li className={styles.ingredientDetails__statsListItem}>
                  <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                  <p className="text text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                </li>
                <li className={styles.ingredientDetails__statsListItem}>
                  <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                  <p className="text text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                </li>
              </ul>
            </div>
          </>
        )}
    </div>
  );
};
