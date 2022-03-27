import styles from './IngredientCard.module.css';
import { useDrag } from 'react-dnd';
import { useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setIngredientDetails } from '../../services/actions';
import { IIngredientCardProps } from './IngredientCard.props';
import { TIngredientType } from '../../services/types';

export const IngredientCard = ({ ingredient }: IIngredientCardProps) => {
  const dispatch = useDispatch();

  const {selectedIngredients} = useSelector(store => ({
    selectedIngredients: store.selectedIngredients.ingredients
  }))

  const inOrderCount = useMemo(() => {
    return selectedIngredients.filter((selectedIngredient: TIngredientType) => selectedIngredient._id === ingredient._id).length;
  }, [selectedIngredients, ingredient._id]);

  const openIngredientDetailsModal = () => {
    dispatch(setIngredientDetails(ingredient))
  }
  
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <li ref={dragRef} onClick={openIngredientDetailsModal} className={styles.ingredientCard}>
      {inOrderCount !== 0 && <div className={styles.ingredientCard__count}><p className="text text_type_digits-default">{inOrderCount}</p></div>}
      <img className={styles.ingredientCard__image} src={ingredient.image} alt={ingredient.image}/>
      <div className={styles.ingredientCard__price}>
        <p className="text text_type_digits-default">{ingredient.price}</p><CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </li>
  )
}
