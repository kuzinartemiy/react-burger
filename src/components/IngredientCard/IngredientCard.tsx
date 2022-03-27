import { useDrag } from 'react-dnd';
import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import styles from './IngredientCard.module.css';
import { useSelector } from '../../services/hooks';
import { IIngredientCardProps } from './IngredientCard.props';
import { TIngredientType } from '../../services/types';

export const IngredientCard = ({ ingredient }: IIngredientCardProps) => {
  const location = useLocation();

  const { selectedIngredients } = useSelector((store) => ({
    selectedIngredients: store.selectedIngredients.ingredients,
  }));

  // eslint-disable-next-line max-len
  const inOrderCount = useMemo(() => selectedIngredients.filter((selectedIngredient: TIngredientType) => selectedIngredient._id === ingredient._id).length, [selectedIngredients, ingredient._id]);

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <li ref={dragRef} className={styles.ingredientCard}>
      <Link
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
        className={styles.ingredientCard__link}
      >
        {inOrderCount !== 0 && <div className={styles.ingredientCard__count}><p className="text text_type_digits-default">{inOrderCount}</p></div>}
        <img className={styles.ingredientCard__image} src={ingredient.image} alt={ingredient.image} />
        <div className={styles.ingredientCard__price}>
          <p className="text text_type_digits-default">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </Link>
    </li>
  );
};
